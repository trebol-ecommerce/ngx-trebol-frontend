/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { IAccessApiService } from './api/access-api.iservice';
import { SessionService } from './session.service';

/**
 * Handles automatic update of authorized access to external API.
 */
@Injectable({ providedIn: 'root' })
export class AuthorizationService
  implements OnDestroy {

  private authorizedAccessSource = new BehaviorSubject<AuthorizedAccess>(null);

  constructor(
    @Inject(API_INJECTION_TOKENS.access) private accessApiService: IAccessApiService,
    private sessionService: SessionService
  ) { }

  // TODO services do not support lifecycle hooks such as this...
  ngOnDestroy(): void {
    this.authorizedAccessSource.complete();
  }

  getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (hasActiveSession ?
        (!!this.authorizedAccessSource.value ?
          this.authorizedAccessSource.asObservable().pipe(take(1)) :
          this.accessApiService.getAuthorizedAccess().pipe(
            tap(access => this.authorizedAccessSource.next(access))
          )
        ) :
        of(null).pipe(
          tap(() => this.authorizedAccessSource.next(null))
        )
      ))
    );
  }
}
