/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
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
      guestLogin() { return of(); }
    };
    mockRegisterApiService = {
      register() { return of(); }
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

  it('should emit after succesful login attempts', () => {
    service = TestBed.inject(AppService);

    service.login(MOCK_LOGIN_DETAILS).pipe(
      mapTo(true),
      catchError(() => of(false))
    ).subscribe(next => {
      expect(next).toBeTruthy();
    });
  });

  it('should rethrow any errors from failing login attempts', () => {
    const mockAuthApiService2 = {
      guestLogin() { return throwError({ status: 500 }); },
      login() { return throwError({ status: 500 }); }
    };
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.login, { useValue: mockAuthApiService2 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    service.login(MOCK_LOGIN_DETAILS).pipe(
      mapTo(true),
      catchError(() => of(false))
    ).subscribe(next => {
      expect(next).toBeFalsy();
    });
  });

  it('should emit login status through an observable', () => {
    service = TestBed.inject(AppService);

    let loginState;
    service.isLoggedInChanges$
      .pipe(take(2))
      .subscribe(isLoggedIn => { loginState = isLoggedIn; });

    service.login(MOCK_LOGIN_DETAILS).subscribe(() => {
      expect(loginState).toBeTruthy();
    });
    service.closeCurrentSession();
    expect(loginState).toBeFalsy();
  });

  it('should emit truthy state for a succesful registration', () => {
    // TODO fix has no expectations
    service = TestBed.inject(AppService);

    service.register(MOCK_REGISTRATION_DETAILS).subscribe(
      next => {
        expect(next).toBeTruthy();
      }
    );
  });

  it('should try to login after a succesful registration', () => {
    // TODO fix has no expectations
    service = TestBed.inject(AppService);

    const loginSpy = spyOn(service, 'login').and.callThrough();
    service.register(MOCK_REGISTRATION_DETAILS).subscribe(
      next => {
        expect(loginSpy).toHaveBeenCalled();
      }
    );
  });

  it('should emit false when unable to register a user', () => {
    const mockAuthApiService2 = {
      register() { return throwError({ status: 500 }); }
    };
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.login, { useValue: mockAuthApiService2 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    const details = MOCK_REGISTRATION_DETAILS;
    service.register(details).subscribe(next => {
      expect(next).toBeFalsy();
    });
  });

  it('should not try to login after a failed registration', () => {
    const mockAuthApiService2 = {
      register() { return throwError({ status: 500 }); }
    };
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.login, { useValue: mockAuthApiService2 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    const loginSpy = spyOn(service, 'login').and.callThrough();
    const details = MOCK_REGISTRATION_DETAILS;
    service.register(details).subscribe(() => {
      expect(loginSpy).not.toHaveBeenCalled();
    });
  });

});
