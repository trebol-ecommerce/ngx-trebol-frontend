/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, merge, of, throwError, timer } from 'rxjs';
import { catchError, mapTo, skip, take, takeUntil, tap } from 'rxjs/operators';
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
      guestLogin() { return of('exampleTokenString'); }
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

  it('should inmediately validate session data & authorization', () => {
    const validationCallSpy = spyOn(mockAccessApiService, 'getAuthorizedAccess').and.callThrough();
    service = TestBed.inject(AppService);

    expect(validationCallSpy).toHaveBeenCalled();
  });

  it('should emit boolean session status inmediately after subscribing', () => {
    service = TestBed.inject(AppService);

    service.isLoggedIn$.pipe(
      takeUntil(timer(50)),
      tap(next => expect(typeof next).toBe('boolean'))
    ).subscribe();
  });

  it('should emit a truthy value after successful login attempts', () => {
    service = TestBed.inject(AppService);

    service.login(MOCK_LOGIN_DETAILS).pipe(
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });

  it('should rethrow any errors from failing login attempts', () => {
    mockLoginApiService.login = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    service.login(MOCK_LOGIN_DETAILS).pipe(
      mapTo(true),
      catchError(() => of(false)),
      tap(next => expect(next).toBeFalsy())
    ).subscribe();
  });

  it('should emit login status through an observable', () => {
    service = TestBed.inject(AppService);

    let loginState: boolean;
    merge(
      service.isLoggedIn$.pipe(
        skip(1), // discards the instant emission
        take(2), // update state after login & after logout
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

  it('should do nothing on inmediate subsequent login attempts, but succeed after logging out first', () => {
    service = TestBed.inject(AppService);

    concat(
      service.login(MOCK_LOGIN_DETAILS).pipe(
        tap(token => expect(token).toBeTruthy())
      ),
      service.login(MOCK_LOGIN_DETAILS).pipe(
        tap(token => {
          expect(token).toBeFalsy();
          service.closeCurrentSession();
        })
      ),
      service.login(MOCK_LOGIN_DETAILS).pipe(
        tap(token => expect(token).toBeTruthy())
      )
    ).subscribe();
  });

  it('should emit truthy state for a successful registration', () => {
    service = TestBed.inject(AppService);

    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(next => {
        expect(next).toBeTruthy();
      })
    ).subscribe();
  });

  it('should try to login after a successful registration', () => {
    service = TestBed.inject(AppService);

    const loginSpy = spyOn(mockLoginApiService, 'login').and.callThrough();
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(() => expect(loginSpy).toHaveBeenCalled())
    ).subscribe();
  });

  it('should emit falsy value from failing registration attempts', () => {
    mockRegisterApiService.register = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(next => expect(next).toBeFalsy())
    ).subscribe();
  });

  it('should not try to login after a failed registration', () => {
    mockRegisterApiService.register = () => throwError({ status: 500 });
    service = TestBed.inject(AppService);

    const loginSpy = spyOn(service, 'login').and.callThrough();
    service.register(MOCK_REGISTRATION_DETAILS).pipe(
      tap(() => expect(loginSpy).not.toHaveBeenCalled())
    ).subscribe();
  });

  it('should expose the current user\'s name', () => {
    const mockProfile = MOCK_REGISTRATION_DETAILS.profile;
    mockProfileApiService.getProfile = () => {
      return of(mockProfile);
    };
    service = TestBed.inject(AppService);

    concat(
      service.login(MOCK_LOGIN_DETAILS),
      service.getUserProfile(),
      service.userName$.pipe(
        take(1),
        tap(userName => expect(userName).toBe(mockProfile.firstName))
      )
    ).subscribe();
  });

  it('should try to update the user profile when requested', () => {
    service = TestBed.inject(AppService);

    const mockProfile = MOCK_REGISTRATION_DETAILS.profile;
    const apiUpdateSpy = spyOn(mockProfileApiService, 'updateProfile').and.callThrough();
    service.updateUserProfile(mockProfile).pipe(
      tap(() => expect(apiUpdateSpy).toHaveBeenCalled())
    ).subscribe();
  });

  it('should emit truthy value after guest login attempts', () => {
    service = TestBed.inject(AppService);

    service.guestLogin(MOCK_REGISTRATION_DETAILS.profile).pipe(
      tap(next => expect(next).toBeTruthy())
    ).subscribe();
  });


});
