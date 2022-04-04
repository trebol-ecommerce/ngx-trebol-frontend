/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, merge, Observable, of, Subscription } from 'rxjs';
import { catchError, filter, map, skip, switchMap, take, takeUntil, tap } from 'rxjs/operators';
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
    return this.authorizedAccessSource.asObservable().pipe(
      take(1)
    );
  }

  private watchSessionActivityAndUpdateAuthorizedAccess() {
    return this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (hasActiveSession ?
        this.periodicallyQueryAuthorizedAccess().pipe(
          takeUntil(this.sessionService.userHasActiveSession$.pipe(
            filter(hasActiveSession => !hasActiveSession))
          )
        ) :
        of(null)
      )),
      tap(access => {
        if (JSON.stringify(this.authorizedAccessSource.value) !== JSON.stringify(access)) {
          this.authorizedAccessSource.next(access);
        }
      })
    );
  }

  private periodicallyQueryAuthorizedAccess() {
    return merge(
      of(void 0),
      interval(this.authorizationUpdateInterval)
    ).pipe(
      switchMap(() => this.accessApiService.getAuthorizedAccess()),
      catchError(() => {
        this.sessionService.closeCurrentSession();
        return EMPTY;
      })
    );
  }
}
