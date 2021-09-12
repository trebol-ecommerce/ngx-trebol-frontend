// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { ISessionApiService } from './api/session-api.iservice';
import { IAccessApiService } from './api/access-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from './api/api-service-injection-tokens';
import { of, throwError } from 'rxjs';
import { Registration } from './models/Registration';
import { take, catchError } from 'rxjs/operators';
import { Login } from './models/Login';

const MOCK_LOGIN_DETAILS: Login = {
  name: 'test',
  password: 'test'
};

const MOCK_REGISTRATION_DETAILS: Registration = {
  name: 'test',
  password: 'test',
  profile: {
    name: 'fulano mengano',
    idCard: '123456789',
    email: 'test@test.org',
    address: 'lorem ipsum',
    phone1: 11111111,
    phone2: 11111111,
  }
};

describe('AppService', () => {
  let service: AppService;
  let mockAuthApiService: Partial<ISessionApiService>;
  let mockAccessApiService: Partial<IAccessApiService>;

  beforeEach(() => {
    mockAuthApiService = {
      guestLogin() { return of(true); },
      getProfile() { return of(null); },
      updateProfile() { return of(true); },
      logout() { return of(true); },
      login() { return of(true); },
      register() { return of(true); }
    };
    mockAccessApiService = {
      getAuthorizedAccess() { return throwError({ status: 403 }); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.auth, useValue: mockAuthApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.dataAccess, useValue: mockAccessApiService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
  });

  it('should emit truthy on succesful login attempts', () => {
    service = TestBed.inject(AppService);

    service.login(MOCK_LOGIN_DETAILS).subscribe(next => {
      expect(next).toBeTruthy();
    });
  });

  it('should rethrow any errors from failing login attempts', () => {
    const mockAuthApiService2 = {
      guestLogin() { return throwError({ status: 500 }); },
      login() { return throwError({ status: 500 }); }
    };
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.auth, { useValue: mockAuthApiService2 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    service.login(MOCK_LOGIN_DETAILS).pipe(
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
    service = TestBed.inject(AppService);

    service.register(MOCK_REGISTRATION_DETAILS).subscribe(
      next => {
        expect(next).toBeTruthy();
      }
    );
  });

  it('should try to login after a succesful registration', () => {
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
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.auth, { useValue: mockAuthApiService2 });
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
    TestBed.overrideProvider(API_SERVICE_INJECTION_TOKENS.auth, { useValue: mockAuthApiService2 });
    service = TestBed.inject(AppService);

    expect(service).toBeTruthy();
    const loginSpy = spyOn(service, 'login').and.callThrough();
    const details = MOCK_REGISTRATION_DETAILS;
    service.register(details).subscribe(() => {
      expect(loginSpy).not.toHaveBeenCalled();
    });
  });

});
