/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Registration } from '../models/Registration';
import { API_SERVICE_INJECTION_TOKENS } from './api/api-service-injection-tokens';
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
    phone1: 11111111,
    phone2: 11111111,
  }
};

describe('ProfileService', () => {
  let service: ProfileService;
  let mockProfileApiService: Partial<IProfileAccountApiService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(() => {
    mockProfileApiService = {
      getProfile() { return of(MOCK_REGISTRATION_DETAILS.profile); },
      updateProfile() { return of(void 0); },
    };
    mockSessionService = {
      userHasActiveSession$: of(true)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.accountProfile, useValue: mockProfileApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it('should expose an empty string as username when there is no active session', () => {
    mockSessionService.userHasActiveSession$ = of(false);
    concat(
      service.getUserProfile(),
      service.userName$.pipe(
        take(1),
        tap(userName => expect(userName).toBe(''))
      )
    ).subscribe();
  });

  it('should try to update the user profile when requested', () => {
    const apiUpdateSpy = spyOn(mockProfileApiService, 'updateProfile').and.callThrough();
    service.updateUserProfile(MOCK_REGISTRATION_DETAILS.profile).pipe(
      tap(() => expect(apiUpdateSpy).toHaveBeenCalled())
    ).subscribe();
  });
});
