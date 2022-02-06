/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, finalize, map, mapTo, share, skip, startWith, switchMap, tap, throttleTime } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ILoginPublicApiService } from 'src/app/api/login-public-api.iservice';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { Person } from 'src/models/entities/Person';
import { Login } from 'src/models/Login';
import { environment } from 'src/environments/environment';
import { IAccessApiService } from './api/access-api.iservice';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice copy';
import { Registration } from '../models/Registration';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  private readonly sessionStorageTokenItemName = environment.secrets.sessionStorageTokenItem;
  private innerIsLoggedIn = false;

  private isLoggedInChangesSource = new Subject<boolean>();
  private isValidatingSessionSource = new BehaviorSubject(false);
  private checkoutAuthCancelSource = new Subject<void>();
  private userProfileSource = new BehaviorSubject<Person>(null);

  isLoggedInChanges$ = this.isLoggedInChangesSource.asObservable();
  isValidatingSession$ = this.isValidatingSessionSource.asObservable();
  checkoutAuthCancel$ = this.checkoutAuthCancelSource.asObservable();
  userName$: Observable<string>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.login) private loginApiService: ILoginPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.guest) private guestApiService: IGuestPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.register) private registerApiService: IRegisterPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.accountProfile) private profileApiService: IProfileAccountApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.access) private accessApiService: IAccessApiService
  ) {
    this.validateSession().subscribe();
    this.userName$ = this.isLoggedInChangesSource.asObservable().pipe(
      startWith(this.isLoggedIn()),
      switchMap(isLoggedIn =>
        (isLoggedIn) ?
          this.profileApiService.getProfile() :
          of(null)
      ),
      tap(profile => this.userProfileSource.next(profile)),
      debounceTime(250),
      map(p => (p?.firstName ? p.firstName : '')),
      share()
    );
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

  guestLogin(personDetails: Person) {
    return this.guestApiService.guestLogin(personDetails).pipe(
      tap(token => this.saveAuthToken(token))
    );
  }

  /** Send an error-safe register request. */
  register(userDetails: Registration) {
    return this.registerApiService.register(userDetails).pipe(
      switchMap(() => this.login({
        name: userDetails.name,
        password: userDetails.password
      })),
      mapTo(true),
      catchError(() => of(false)),
    );
  }

  login(credentials: Login) {
    return !this.isLoggedIn() ?
      this.loginApiService.login(credentials).pipe(
        tap(token => this.saveAuthToken(token))
      ) :
      of();
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
    if (this.userProfileSource.value) {
      return this.userProfileSource.asObservable();
    }
    return this.profileApiService.getProfile().pipe(
      tap(profile => this.userProfileSource.next(profile))
    );
  }

  updateUserProfile(details: Person): Observable<boolean> {
    return this.profileApiService.updateProfile(details);
  }

  closeCurrentSession(): void {
    this.innerIsLoggedIn = false;
    this.isLoggedInChangesSource.next(false);
    this.userProfileSource.next(null);
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
  }

  private saveAuthToken(token: any) {
    sessionStorage.setItem(this.sessionStorageTokenItemName, token);
    this.innerIsLoggedIn = true;
    this.isLoggedInChangesSource.next(true);
  }

}
