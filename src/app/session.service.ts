/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { environment } from 'src/environments/environment';
import { IAccessApiService } from './api/access-api.iservice';

/**
 * Exposes a few observables and methods to acknowledge & update session state
 */
@Injectable({ providedIn: 'root' })
export class SessionService
  implements OnDestroy {

  private readonly sessionStorageTokenItemName = environment.secrets.sessionStorageTokenItem;

  private userHasActiveSessionSource = new ReplaySubject<boolean>(1);
  private isValidatingSessionSource = new BehaviorSubject(false);

  userHasActiveSession$ = this.userHasActiveSessionSource.asObservable();
  isValidatingSession$ = this.isValidatingSessionSource.asObservable();

  constructor(
    @Inject(API_INJECTION_TOKENS.access) private accessApiService: IAccessApiService
  ) { }

  // TODO services do not support lifecycle hooks such as this...
  ngOnDestroy(): void {
    this.userHasActiveSessionSource.complete();
    this.isValidatingSessionSource.complete();
  }

  validateSession(emit = true): Observable<boolean> {
    this.isValidatingSessionSource.next(true);

    return this.accessApiService.getAuthorizedAccess().pipe(
      map(() => true),
      catchError(() => of(false)),
      tap(isValid => {
        if (emit) {
          this.userHasActiveSessionSource.next(isValid);
        }
      }),
      finalize(() => { this.isValidatingSessionSource.next(false); })
    );
  }

  closeCurrentSession(): void {
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
    this.userHasActiveSessionSource.next(false);
  }

  saveToken(token: any) {
    sessionStorage.setItem(this.sessionStorageTokenItemName, token);
    this.userHasActiveSessionSource.next(true);
  }

}
