/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, filter, mapTo, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { environment } from 'src/environments/environment';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { IAccessApiService } from './api/access-api.iservice';
import { SessionService } from './session.service';

/**
 * Handles automatic update of authorized access to external API.
 */
@Injectable({ providedIn: 'root' })
export class AuthorizationService
  implements OnDestroy {

  private readonly authorizationUpdateInterval = environment.constraints.authorizedAccessUpdateInterval;
  private authorizedAccessSource = new BehaviorSubject<AuthorizedAccess>(null);
  private sessionStateSub: Subscription;

  constructor(
    @Inject(API_INJECTION_TOKENS.access) private accessApiService: IAccessApiService,
    private sessionService: SessionService
  ) {
    this.sessionStateSub = this.watchSessionActivityAndUpdateAuthorizedAccess().subscribe();
  }

  ngOnDestroy(): void {
    this.authorizedAccessSource.complete();
    this.sessionStateSub?.unsubscribe();
  }

  getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (hasActiveSession ?
        ( this.authorizedAccessSource.value !== null ?
          this.authorizedAccessSource.asObservable().pipe(take(1)) :
          this.accessApiService.getAuthorizedAccess().pipe(
            tap(access => { this.authorizedAccessSource.next(access); })
          )
        ) :
        of(null).pipe(tap(() => { this.authorizedAccessSource.next(null) }))
      ))
    );
  }

  private watchSessionActivityAndUpdateAuthorizedAccess() {
    return this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (hasActiveSession ?
        this.periodicallyUpdateAuthorizedAccess() :
        of(false)
      )),
      catchError(() => {
        this.sessionService.closeCurrentSession();
        this.authorizedAccessSource.next(null);
        return of(false);
      })
    );
  }

  private periodicallyUpdateAuthorizedAccess() {
    return merge(
      of(void 0),
      interval(this.authorizationUpdateInterval)
    ).pipe(
      takeUntil(this.sessionService.userHasActiveSession$.pipe(filter(isActive => !isActive))),
      switchMap(() => this.accessApiService.getAuthorizedAccess()),
      tap(access => { this.authorizedAccessSource.next(access); }),
      mapTo(true)
    );
  }
}
