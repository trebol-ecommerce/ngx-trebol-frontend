// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, mapTo, tap, switchMap, take } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { SessionApiIService } from 'src/app/api/session/session-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { Login } from 'src/app/models/Login';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { DataAccessApiIService } from './api/data/data-access.api.iservice';
import { Registration } from './models/Registration';

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
    @Inject(API_SERVICE_INJECTION_TOKENS.auth) protected authService: SessionApiIService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataAccess) protected apiAccessService: DataAccessApiIService
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
    return this.authService.guestLogin(personDetails);
  }

  /** Send an error-safe register request. */
  public register(userDetails: Registration): Observable<boolean> {
    return this.authService.register(userDetails).pipe(
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
      this.authService.login(credentials).pipe(
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
    return this.authService.getProfile();
  }

  public updateUserProfile(details: Person): Observable<boolean> {
    return this.authService.updateProfile(details);
  }

  public closeCurrentSession(): void {
    this.innerIsLoggedIn = false;
    this.isLoggedInChangesSource.next(false);
    this.authService.logout().subscribe();
  }

}
