/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, finalize, ignoreElements, onErrorResumeNext, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { environment } from 'src/environments/environment';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { IAccessApiService } from './api/access-api.iservice';

/**
 * Exposes a few observables and methods to acknowledge & update session state
 */
@Injectable({ providedIn: 'root' })
export class SessionService {

  private readonly sessionStorageTokenItemName = environment.secrets.sessionStorageTokenItem;

  private authorizedAccessSource = new BehaviorSubject<AuthorizedAccess>(null);
  private userHasActiveSessionSource = new ReplaySubject<boolean>(1);
  private isValidatingSessionSource = new BehaviorSubject(false);

  authorizedAccess$: Observable<AuthorizedAccess>;
  userHasActiveSession$: Observable<boolean>;
  isValidatingSession$: Observable<boolean>;

  constructor(
    @Inject(API_INJECTION_TOKENS.access) private accessApiService: IAccessApiService
  ) {
    this.authorizedAccess$ = this.authorizedAccessSource.asObservable().pipe(
      distinctUntilChanged()
    );
    this.userHasActiveSession$ = this.userHasActiveSessionSource.asObservable().pipe(
      distinctUntilChanged()
    );
    this.isValidatingSession$ = this.isValidatingSessionSource.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  validateSession() {
    this.isValidatingSessionSource.next(true);

    return this.accessApiService.getAuthorizedAccess().pipe(
      tap(
        next => {
          this.authorizedAccessSource.next(next);
          this.userHasActiveSessionSource.next(true);
        },
        err => {
          this.authorizedAccessSource.next(null);
          this.closeCurrentSession()
        }
      ),
      onErrorResumeNext(),
      ignoreElements(),
      finalize(() => { this.isValidatingSessionSource.next(false); })
    );
  }

  closeCurrentSession(): void {
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
    this.userHasActiveSessionSource.next(false);
  }

  saveToken(token: any) {
    sessionStorage.setItem(this.sessionStorageTokenItemName, token);
    return this.validateSession();
  }

}
