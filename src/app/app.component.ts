/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { concat, interval, merge, Observable, of, Subscription } from 'rxjs';
import { filter, ignoreElements, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit, OnDestroy {

  private recurrentSessionCheck: Subscription;
  readonly authorizationUpdateInterval = environment.constraints.authorizedAccessUpdateInterval;

  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
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
    this.recurrentSessionCheck = this.periodicallyQueryAuthorizedAccess().subscribe();
  }

  ngOnDestroy(): void {
    this.recurrentSessionCheck?.unsubscribe();
  }

  private periodicallyQueryAuthorizedAccess() {
    return merge(
      this.sessionService.validateSession().pipe(
        ignoreElements()
      ),
      this.sessionService.userHasActiveSession$.pipe(
        filter(hasActiveSession => hasActiveSession),
        switchMap(() => interval(this.authorizationUpdateInterval).pipe(
          takeUntil(this.sessionService.userHasActiveSession$.pipe(
            filter(hasActiveSession => !hasActiveSession)
          ))
        )),
        switchMap(() => this.sessionService.validateSession(false)),
      )
    ).pipe(
      filter(isValid => !isValid),
      tap(() => {
        this.sessionService.closeCurrentSession();
        this.router.navigateByUrl('/');
      })
    );
  }
}
