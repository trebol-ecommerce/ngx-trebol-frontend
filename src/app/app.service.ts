/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, mapTo, switchMap, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ILoginPublicApiService } from 'src/app/api/login-public-api.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { Person } from 'src/app/models/entities/Person';
import { Login } from 'src/app/models/Login';
import { IAccessApiService } from './api/access-api.iservice';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice copy';
import { Registration } from './models/Registration';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  private innerIsLoggedIn = false;

  private isLoggedInChangesSource = new Subject<boolean>();
  private isValidatingSessionSource = new BehaviorSubject<boolean>(false);
  private checkoutAuthCancelSource = new Subject<void>();

  isLoggedInChanges$: Observable<boolean> = this.isLoggedInChangesSource.asObservable();
  isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();
  checkoutAuthCancel$ = this.checkoutAuthCancelSource.asObservable();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.login) private loginApiService: ILoginPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.guest) private guestApiService: IGuestPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.register) private registerApiService: IRegisterPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.accountProfile) private profileApiService: IProfileAccountApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.access) private accessApiService: IAccessApiService
  ) {
    this.validateSession().subscribe();
  }

  ngOnDestroy(): void {
    this.isLoggedInChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  isLoggedIn(): boolean {
    return this.innerIsLoggedIn;
  }

  cancelAuthentication(): void {
    this.checkoutAuthCancelSource.next();
  }

  guestLogin(personDetails: Person): Observable<boolean> {
    return this.guestApiService.guestLogin(personDetails);
  }

  /** Send an error-safe register request. */
  register(userDetails: Registration): Observable<boolean> {
    return this.registerApiService.register(userDetails).pipe(
      mapTo(true),
      switchMap(
        () => this.login({
          name: userDetails.name,
          password: userDetails.password
        })
      ),
      catchError(() => of(false)),
    );
  }

  login(credentials: Login): Observable<boolean> {
    return !this.isLoggedIn() ?
      this.loginApiService.login(credentials).pipe(
        tap(success => {
          this.innerIsLoggedIn = success;
          this.isLoggedInChangesSource.next(success);
        })
      ) :
      of(true);
  }

  validateSession(): Observable<boolean> {
    this.isValidatingSessionSource.next(true);

    return this.accessApiService.getAuthorizedAccess().pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(isValid => {
        this.innerIsLoggedIn = isValid;
        this.isLoggedInChangesSource.next(isValid);
      }),
      finalize(() => { this.isValidatingSessionSource.next(false); })
    );
  }

  getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.isLoggedIn() ? this.accessApiService.getAuthorizedAccess() : of(null);
  }

  getUserProfile(): Observable<Person> {
    return this.profileApiService.getProfile();
  }

  updateUserProfile(details: Person): Observable<boolean> {
    return this.profileApiService.updateProfile(details);
  }

  closeCurrentSession(): void {
    this.innerIsLoggedIn = false;
    this.isLoggedInChangesSource.next(false);
    this.loginApiService.logout();
  }

}
