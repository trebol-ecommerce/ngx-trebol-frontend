/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, EMPTY, merge, of, throwError } from 'rxjs';
import { finalize, skip, take, takeLast, takeUntil, tap, toArray } from 'rxjs/operators';
import { IAccessApiService } from './api/access-api.iservice';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let accessApiServiceSpy: jasmine.SpyObj<IAccessApiService>;

  beforeEach(() => {
    const mockAccessApiService = jasmine.createSpyObj('IAccessApiService', ['getAuthorizedAccess']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.access, useValue: mockAccessApiService }
      ]
    });
  });

  beforeEach(() => {
    accessApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.access) as jasmine.SpyObj<IAccessApiService>;
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('always', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of(void 0));
    });

    it('should call `saveToken()` without errors', () => {
      expect(() => {
        service.saveToken('sometoken');
      }).not.toThrow();
    });

    it('should call `closeCurrentSession()` without errors', () => {
      expect(() => {
        service.closeCurrentSession();
      }).not.toThrow();
    });

    it('should have `userHasActiveSession$` emit `true` when a new token comes in', () => {
      merge(
        EMPTY.pipe(
          finalize(() => service.saveToken('sometoken'))
        ),
        service.userHasActiveSession$.pipe(
          take(1),
          tap(next => expect(next).toBeTrue())
        )
      ).subscribe();
    });

    it('should have `userHasActiveSession$` emit `false` when logging out', () => {
      merge(
        EMPTY.pipe(
          finalize(() => {
            service.saveToken('sometoken');
            service.closeCurrentSession();
          })
        ),
        service.userHasActiveSession$.pipe(
          take(2),
          takeLast(1),
          tap(next => expect(next).toBeFalse())
        )
      ).subscribe();
    });

    it('should have `userHasActiveSession$` emit an update only when it changes', () => {
      service.userHasActiveSession$.pipe(
        skip(1),
        take(1),
        takeUntil(
          concat(
            service.validateSession(),
            service.validateSession(),
            service.validateSession(),
            of(void 0).pipe(
              tap(() => service.saveToken('sometoken'))
            )
          ).pipe(
            takeLast(1)
          )
        ),
        tap(next => {
          expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(3);
          expect(next).toBeTrue();
        })
      ).subscribe();
    });
  });

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(throwError({ status: 403 }));
      service.validateSession().subscribe();
    });

    it('should have `userHasActiveSession$` emit false', () => {
      service.userHasActiveSession$.pipe(
        take(1),
        tap(next => expect(next).toBeFalse())
      ).subscribe();
    });

    it('should have `authorizedAccess$` emit null', () => {
      service.authorizedAccess$.pipe(
        take(1),
        tap(access => expect(access).toEqual(null))
      ).subscribe();
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      service.validateSession().subscribe();
    });

    it('should have `userHasActiveSession$` emit true', () => {
      service.userHasActiveSession$.pipe(
        take(1),
        tap(next => expect(next).toBeTrue())
      ).subscribe();
    });

    it('should have `authorizedAccess$` emit actual data', () => {
      service.authorizedAccess$.pipe(
        take(1),
        tap(access => expect(access).toEqual({ routes: [] }))
      ).subscribe();
    });
  });
});
