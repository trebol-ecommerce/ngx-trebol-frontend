/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, of, throwError } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { Registration } from '../models/Registration';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
import { IProfileAccountApiService } from './api/profile-account-api.iservice';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

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

describe('ProfileService', () => {
  let service: ProfileService;
  let profileApiServiceSpy: jasmine.SpyObj<IProfileAccountApiService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    const mockProfileApiService = jasmine.createSpyObj('IProfileAccountApiService', [ 'getProfile', 'updateProfile' ]);
    const mockSessionService = jasmine.createSpyObj('SessionService', [ 'userHasActiveSession$' ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.accountProfile, useValue: mockProfileApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    profileApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.accountProfile) as jasmine.SpyObj<IProfileAccountApiService>;
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call `ngOnDestroy()` without errors', () => {
    expect(() => {
      service.ngOnDestroy();
    }).not.toThrow();
  });

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(false);
      profileApiServiceSpy.getProfile.and.returnValue(throwError({ status: 403 }));
      profileApiServiceSpy.updateProfile.and.returnValue(throwError({ status: 403 }));
    });

    it('should expose an empty string as username', () => {
      concat(
        service.getUserProfile(),
        service.userName$.pipe(
          take(1),
          tap(userName => expect(userName).toBe(''))
        )
      ).subscribe();
    });

    it('should not allow to update the user profile', () => {
      service.updateUserProfile(MOCK_REGISTRATION_DETAILS.profile).pipe(
        finalize(() => expect(profileApiServiceSpy.updateProfile).not.toHaveBeenCalled())
      ).subscribe();
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(true);
      profileApiServiceSpy.getProfile.and.returnValue(of(MOCK_REGISTRATION_DETAILS.profile));
      profileApiServiceSpy.updateProfile.and.returnValue(of(void 0));
    });

    it('should expose the current user\'s name', () => {
      concat(
        service.getUserProfile(),
        service.userName$.pipe(
          take(1),
          tap(userName => expect(userName).toBe(MOCK_REGISTRATION_DETAILS.profile.firstName))
        )
      ).subscribe();
    });

    it('should serve a cached result in subsequent calls to `getUserProfile()`', () => {
      concat(
        service.getUserProfile(),
        service.getUserProfile(),
        service.getUserProfile()
      ).pipe(
        finalize(() => expect(profileApiServiceSpy.getProfile).toHaveBeenCalledTimes(1))
      ).subscribe();
    });

    it('should update the user profile upon request', () => {
      service.updateUserProfile(MOCK_REGISTRATION_DETAILS.profile).pipe(
        finalize(() => expect(profileApiServiceSpy.updateProfile).toHaveBeenCalled())
      ).subscribe();
    });
  });

});
