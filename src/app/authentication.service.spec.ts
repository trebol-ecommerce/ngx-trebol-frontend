/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Login } from '../models/Login';
import { Registration } from '../models/Registration';
import { API_SERVICE_INJECTION_TOKENS } from './api/api-service-injection-tokens';
import { IGuestPublicApiService } from './api/guest-public-api.iservice';
import { ILoginPublicApiService } from './api/login-public-api.iservice';
import { IRegisterPublicApiService } from './api/register-public-api.iservice';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';

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

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let mockLoginApiService: Partial<ILoginPublicApiService>;
  let mockGuestApiService: Partial<IGuestPublicApiService>;
  let mockRegisterApiService: Partial<IRegisterPublicApiService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(() => {
    mockLoginApiService = {
      login() { return of('exampleTokenString'); }
    };
    mockGuestApiService = {
      guestLogin() { return of('exampleTokenString'); }
    };
    mockRegisterApiService = {
      register() { return of(void 0); }
    };
    mockSessionService = {
      saveToken() { },
      userHasActiveSession$: of(false)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.login, useValue: mockLoginApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.guest, useValue: mockGuestApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.register, useValue: mockRegisterApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a truthy value after a successful login attempt', () => {
    service.login(MOCK_LOGIN_DETAILS).pipe(
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });

  it('should emit a truthy value after a successful registration attempt', () => {
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });

  it('should emit a truthy value after a successful login-as-guest attempt', () => {
    service.guestLogin(MOCK_REGISTRATION_DETAILS.profile).pipe(
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });

  it('should rethrow any errors from the API when a login attempt fails', () => {
    spyOn(mockLoginApiService, 'login').and.returnValue(throwError({ status: 500 }));

    service.login(MOCK_LOGIN_DETAILS).pipe(
      catchError(() => of(false)),
      tap(next => expect(next).toBeFalsy())
    ).subscribe();
  });

  it('should request to save the session token after a successful login attempt', () => {
    const saveTokenSpy = spyOn(mockSessionService, 'saveToken').and.callThrough();
    service.login(MOCK_LOGIN_DETAILS).pipe(
      tap(token => {
        expect(saveTokenSpy).toHaveBeenCalled();
        expect(saveTokenSpy).toHaveBeenCalledWith(token);
      })
    ).subscribe();
  });

  it('should do nothing if trying to login while already logged-in', () => {
    mockSessionService.userHasActiveSession$ = of(true);

    const saveTokenSpy = spyOn(mockSessionService, 'saveToken');
    service.login(MOCK_LOGIN_DETAILS).pipe(
      tap(token => expect(saveTokenSpy).not.toHaveBeenCalled())
    ).subscribe();
    mockSessionService.userHasActiveSession$ = of(false);
  });

  it('should try to login after a successful registration', () => {
    const loginSpy = spyOn(mockLoginApiService, 'login').and.callThrough();
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(() => expect(loginSpy).toHaveBeenCalled())
    ).subscribe();
  });

  it('should not try to login after a failed registration', () => {
    spyOn(mockRegisterApiService, 'register').and.returnValue(throwError({ status: 500 }));

    const loginSpy = spyOn(service, 'login');
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      catchError(err => {
        expect(err.status).toEqual(500);
        return EMPTY;
      }),
      finalize(() => expect(loginSpy).not.toHaveBeenCalled())
    ).subscribe();
  });
});
