/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { throwError, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IAccessApiService } from './api/access-api.iservice';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let mockAccessApiService: Partial<IAccessApiService>;

  beforeEach(() => {
    mockAccessApiService = {
      getAuthorizedAccess() { return throwError({ status: 403 }); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.access, useValue: mockAccessApiService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(SessionService);

    expect(service).toBeTruthy();
  });

  it('should inmediately validate session data & authorization', () => {
    const validationCallSpy = spyOn(mockAccessApiService, 'getAuthorizedAccess').and.callThrough();
    service = TestBed.inject(SessionService);

    expect(validationCallSpy).toHaveBeenCalled();
  });

  it('should emit boolean session status inmediately after subscribing', () => {
    service = TestBed.inject(SessionService);

    service.userHasActiveSession$.pipe(
      takeUntil(timer(50)),
      tap(next => expect(typeof next).toBe('boolean'))
    ).subscribe();
  });
});
