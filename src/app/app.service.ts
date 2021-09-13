// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, mapTo, tap, switchMap, take } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ILoginPublicApiService } from 'src/app/api/login-public-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { Login } from 'src/app/models/Login';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { IAccessApiService } from './api/access-api.iservice';
import { Registration } from './models/Registration';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice copy';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';

@Injectable({ providedIn: 'root' })
export class AppService
  implements OnDestroy {

  protected innerIsLoggedIn = false;

  protected isLoggedInChangesSource = new Subject<boolean>();
  protected isValidatingSessionSource = new BehaviorSubject<boolean>(false);
  protected checkoutAuthCancelSource = new Subject<void>();

  public isLoggedInChanges$: Observable<boolean> = this.isLoggedInChangesSource.asObservable();
  public isValidatingSession$: Observable<boolean> = this.isValidatingSessionSource.asObservable();
  public checkoutAuthCancel$ = this.checkoutAuthCancelSource.asObservable();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.login) protected loginApiService: ILoginPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.guest) protected guestApiService: IGuestPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.register) protected registerApiService: IRegisterPublicApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.accountProfile) protected profileApiService: IProfileAccountApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.access) protected apiAccessService: IAccessApiService
  ) {
    this.validateSession().subscribe();
  }

  ngOnDestroy(): void {
    this.isLoggedInChangesSource.complete();
    this.isValidatingSessionSource.complete();
  }

  public isLoggedIn(): boolean {
    return this.innerIsLoggedIn;
  }

  public cancelAuthentication(): void {
    this.checkoutAuthCancelSource.next();
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.guestApiService.guestLogin(personDetails);
  }

  /** Send an error-safe register request. */
  public register(userDetails: Registration): Observable<boolean> {
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

  public login(credentials: Login): Observable<boolean> {
    return !this.isLoggedIn() ?
      this.loginApiService.login(credentials).pipe(
        tap(success => {
          this.innerIsLoggedIn = success;
          this.isLoggedInChangesSource.next(success);
        })
      ) :
      of(true);
  }

  public validateSession(): Observable<boolean> {
    this.isValidatingSessionSource.next(true);

    return this.apiAccessService.getAuthorizedAccess().pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(isValid => {
        this.innerIsLoggedIn = isValid;
        this.isLoggedInChangesSource.next(isValid);
      }),
      finalize(() => { this.isValidatingSessionSource.next(false); })
    );
  }

  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.isLoggedIn() ? this.apiAccessService.getAuthorizedAccess() : of(null);
  }

  public getUserProfile(): Observable<Person> {
    return this.profileApiService.getProfile();
  }

  public updateUserProfile(details: Person): Observable<boolean> {
    return this.profileApiService.updateProfile(details);
  }

  public closeCurrentSession(): void {
    this.innerIsLoggedIn = false;
    this.isLoggedInChangesSource.next(false);
    this.loginApiService.logout();
  }

}
