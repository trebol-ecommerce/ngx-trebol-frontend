/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAccessApiService } from './api/access-api.iservice';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
import { AuthorizationService } from './authorization.service';
import { SessionService } from './session.service';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let mockAccessApiService: Partial<IAccessApiService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(() => {
    mockAccessApiService = {
      getAuthorizedAccess() {
        return of({
          routes: []
        });
      }
    };
    mockSessionService = {
      userHasActiveSession$: of(true)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.access, useValue: mockAccessApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(AuthorizationService);
    expect(service).toBeTruthy();
  });

  it('should inmediately update authorization details for logged-in users', () => {
    const validationCallSpy = spyOn(mockAccessApiService, 'getAuthorizedAccess').and.callThrough();
    service = TestBed.inject(AuthorizationService);

    expect(validationCallSpy).toHaveBeenCalled();
  });

  it('should inmediately throw null authorization data when not logged-in', () => {
    service = TestBed.inject(AuthorizationService);
    mockSessionService.userHasActiveSession$ = of(false);

    service.getAuthorizedAccess().pipe(
      tap(access => expect(access).toEqual(null))
    ).subscribe();
  });
});
