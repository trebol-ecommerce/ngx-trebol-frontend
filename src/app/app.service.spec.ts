/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { merge, of, throwError } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { IAccessApiService } from './api/access-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from './api/api-service-injection-tokens';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { ILoginPublicApiService } from './api/login-public-api.iservice';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice';
import { AppService } from './app.service';
import { Login } from '../models/Login';
import { Registration } from '../models/Registration';

const MOCK_LOGIN_DETAILS: Login = {
  name: 'test',
  password: 'test'
};

const MOCK_REGISTRATION_DETAILS: Registration = {
  name: 'test',
  password: 'test',
  profile: {
    firstName: 'fulano',
    lastName: 'mengano',
    idNumber: '123456789',
    email: 'test@test.org',
    phone1: 11111111,
    phone2: 11111111,
  }
};

describe('AppService', () => {
  let service: AppService;
  let mockLoginApiService: Partial<ILoginPublicApiService>;
  let mockGuestApiService: Partial<IGuestPublicApiService>;
  let mockRegisterApiService: Partial<IRegisterPublicApiService>;
  let mockProfileApiService: Partial<IProfileAccountApiService>;
  let mockAccessApiService: Partial<IAccessApiService>;

  beforeEach(() => {
    mockLoginApiService = {
      login() { return of('exampleTokenString'); }
    };
    mockGuestApiService = {
      guestLogin() { return of(void 0); }
    };
    mockRegisterApiService = {
      register() { return of(void 0); }
    };
    mockProfileApiService = {
      getProfile() { return of(null); },
      updateProfile() { return of(true); },
    };
    mockAccessApiService = {
      getAuthorizedAccess() { return throwError({ status: 403 }); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.login, useValue: mockLoginApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.guest, useValue: mockGuestApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.register, useValue: mockRegisterApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.accountProfile, useValue: mockProfileApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.access, useValue: mockAccessApiService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
  });

  it('should emit a truthy value after succesful login attempts', () => {
    service = TestBed.inject(AppService);

    service.login(MOCK_LOGIN_DETAILS).pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });

  it('should rethrow any errors from failing login attempts', () => {
    mockLoginApiService.login = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    service.login(MOCK_LOGIN_DETAILS).pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(next => expect(next).toBeFalsy())
    ).subscribe();
  });

  it('should emit login status through an observable', () => {
    service = TestBed.inject(AppService);

    let loginState = service.isLoggedIn();
    merge(
      service.isLoggedInChanges$.pipe(
        take(2),
        tap(isLoggedIn => { loginState = isLoggedIn; })
      ),
      service.login(MOCK_LOGIN_DETAILS).pipe(
        tap(() => {
          expect(loginState).toBeTruthy();
          service.closeCurrentSession();
          expect(loginState).toBeFalsy();
        })
      )
    ).subscribe();
  });

  it('should emit truthy state for a succesful registration', () => {
    service = TestBed.inject(AppService);

    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(next => {
        expect(next).toBeTruthy();
      })
    ).subscribe();
  });

  it('should try to login after a succesful registration', () => {
    service = TestBed.inject(AppService);

    const loginSpy = spyOn(service, 'login').and.callThrough();
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(() => expect(loginSpy).toHaveBeenCalled())
    ).subscribe();
  });

  it('should emit falsy value when unable to register a user', () => {
    mockRegisterApiService.register = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    const details = MOCK_REGISTRATION_DETAILS;
    service.register(details).pipe(
      tap(next => expect(next).toBeFalsy())
    ).subscribe();
  });

  it('should not try to login after a failed registration', () => {
    mockRegisterApiService.register = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    const loginSpy = spyOn(service, 'login').and.callThrough();
    const details = MOCK_REGISTRATION_DETAILS;
    service.register(details).pipe(
      tap(() => expect(loginSpy).not.toHaveBeenCalled())
    ).subscribe();
  });

});
