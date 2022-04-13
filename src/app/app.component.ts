/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { concat, EMPTY, interval, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit, OnDestroy {

  private sessionCheckSub: Subscription;
  readonly authorizationUpdateInterval = environment.constraints.authorizedAccessUpdateInterval;

  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = concat(
      of(true),
      this.router.events.pipe(
        filter(ev => ev instanceof ActivationEnd),
        take(1),
        map(() => false)
      )
    );
    this.sessionCheckSub = this.periodicallyQueryAuthorizedAccess().subscribe();
  }

  ngOnDestroy(): void {
    this.sessionCheckSub?.unsubscribe();
  }

  private periodicallyQueryAuthorizedAccess() {
    return merge(
      this.sessionService.validateSession().pipe(
        switchMap(() => this.sessionService.fetchAuthorizedAccess())
      ),
      this.sessionService.userHasActiveSession$.pipe(
        filter(hasActiveSession => hasActiveSession),
        switchMap(() => concat(
          this.profileService.getUserProfile().pipe(
            catchError(() => EMPTY)
          ),
          interval(this.authorizationUpdateInterval).pipe(
            takeUntil(this.sessionService.userHasActiveSession$.pipe(
              filter(hasActiveSession => !hasActiveSession)
            )),
            switchMap(() => this.sessionService.validateSession(false))
          )
        ))
      )
    );
  }
}
