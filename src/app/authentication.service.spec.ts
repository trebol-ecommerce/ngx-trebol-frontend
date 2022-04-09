/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, EMPTY, merge, of, throwError, timer } from 'rxjs';
import { catchError, count, finalize, ignoreElements, take, takeUntil, tap } from 'rxjs/operators';
import { Login } from '../models/Login';
import { Registration } from '../models/Registration';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
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
    phone1: '11111111',
    phone2: '11111111',
  }
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let loginApiServiceSpy: jasmine.SpyObj<ILoginPublicApiService>;
  let guestApiServiceSpy: jasmine.SpyObj<IGuestPublicApiService>;
  let registerApiServiceSpy: jasmine.SpyObj<IRegisterPublicApiService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    const mockLoginApiService = jasmine.createSpyObj('ILoginPublicApiService', ['login']);
    const mockGuestApiService = jasmine.createSpyObj('IGuestPublicApiService', ['guestLogin']);
    const mockRegisterApiService = jasmine.createSpyObj('IRegisterPublicApiService', ['register']);
    const mockSessionService = jasmine.createSpyObj('SessionService', ['saveToken', 'userHasActiveSession$']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.login, useValue: mockLoginApiService },
        { provide: API_INJECTION_TOKENS.guest, useValue: mockGuestApiService },
        { provide: API_INJECTION_TOKENS.register, useValue: mockRegisterApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    loginApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.login) as jasmine.SpyObj<ILoginPublicApiService>;
    guestApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.guest) as jasmine.SpyObj<IGuestPublicApiService>;
    registerApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.register) as jasmine.SpyObj<IRegisterPublicApiService>;
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit an event when `cancelAuthentication()` is called', () => {
    merge(
      service.authCancelation$.pipe(
        take(1),
        count()
      ),
      of().pipe(
        finalize(() => service.cancelAuthentication())
      )
    ).pipe(
      tap(c => expect(c).toBe(1))
    ).subscribe();
  });

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(false);
    });

    describe('and any login attempt succeeds', () => {
      beforeEach(() => {
        loginApiServiceSpy.login.and.returnValue(of('sometoken'));
        guestApiServiceSpy.guestLogin.and.returnValue(of('sometoken'));
      });

      it('should emit the token', () => {
        concat(
          service.login(MOCK_LOGIN_DETAILS),
          service.guestLogin(MOCK_REGISTRATION_DETAILS.profile)
        ).pipe(
          tap(token => expect(token).toBe('sometoken'))
        ).subscribe();
      });

      it('should save the returned session token', () => {
        concat(
          service.login(MOCK_LOGIN_DETAILS),
          service.guestLogin(MOCK_REGISTRATION_DETAILS.profile)
        ).pipe(
          tap(token => {
            expect(sessionServiceSpy.saveToken).toHaveBeenCalled();
            expect(sessionServiceSpy.saveToken).toHaveBeenCalledWith(token);
          })
        ).subscribe();
      });
    });

    describe('and a registration attempt succeeds', () => {
      beforeEach(() => {
        registerApiServiceSpy.register.and.returnValue(of('sometoken'));
      });

      it('should invoke an inmediate login with the same ', () => {
        loginApiServiceSpy.login.and.returnValue(of('sometoken'));
        service.register(MOCK_REGISTRATION_DETAILS).pipe(
          tap(() => {
            expect(loginApiServiceSpy.login).toHaveBeenCalled();
            expect(loginApiServiceSpy.login).toHaveBeenCalledWith({
              name: MOCK_REGISTRATION_DETAILS.name,
              password: MOCK_REGISTRATION_DETAILS.password
            });
          })
        ).subscribe();
      });
    });

    describe('and any login attempt fails', () => {
      beforeEach(() => {
        loginApiServiceSpy.login.and.returnValue(throwError({ status: 500 }));
        guestApiServiceSpy.guestLogin.and.returnValue(throwError({ status: 500 }));
      });

      it('should rethrow errors from the API', () => {
        concat(
          service.login(MOCK_LOGIN_DETAILS),
          service.guestLogin(MOCK_REGISTRATION_DETAILS.profile)
        ).pipe(
          catchError(err => {
            expect(err.status).toBe(500);
            return of('');
          })
        ).subscribe();
      });
    });

    describe('and a registration attempt fails', () => {
      beforeEach(() => {
        registerApiServiceSpy.register.and.returnValue(throwError({ status: 500 }));
      });

      it('should not try to login afterwards', () => {
        service.register(MOCK_REGISTRATION_DETAILS).pipe(
          catchError(err => {
            expect(err.status).toBe(500);
            return EMPTY;
          }),
          finalize(() => expect(loginApiServiceSpy.login).not.toHaveBeenCalled())
        ).subscribe();
      });
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(true);
    });

    it('should not try to login', () => {
      concat(
        service.login(MOCK_LOGIN_DETAILS),
        service.guestLogin(MOCK_REGISTRATION_DETAILS.profile)
      ).pipe(
        finalize(() => {
          expect(loginApiServiceSpy.login).not.toHaveBeenCalled();
          expect(guestApiServiceSpy.guestLogin).not.toHaveBeenCalled();
          expect(sessionServiceSpy.saveToken).not.toHaveBeenCalled();
        })
      ).subscribe();
    });
  });
});
