/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, merge, of, throwError } from 'rxjs';
import { count, filter, finalize, skip, take, tap } from 'rxjs/operators';
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
    accessApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.access) as jasmine.SpyObj<IAccessApiService>;
  });

  describe('always', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of(void 0));
      service = TestBed.inject(SessionService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should validate session data & authorization right away', () => {
      expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalled();
      expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(1);
    });

    it('should have `userHasActiveSession$` emit right away', () => {
      service.userHasActiveSession$.pipe(
        take(1),
        tap(next => expect(next).toBeDefined())
      ).subscribe();
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
      service.userHasActiveSession$.pipe(
        skip(1),
        take(1),
        tap(next => expect(next).toBeTrue())
      ).subscribe();
      service.saveToken('sometoken');
    });

    it('should have `userHasActiveSession$` emit `false` when logging out', () => {
      service.userHasActiveSession$.pipe(
        skip(1),
        take(1),
        tap(next => expect(next).toBeFalse())
      ).subscribe();
      service.closeCurrentSession();
    });

    it('should have `userHasActiveSession$` emit an update when `validateSession()` is called', () => {
      const totalChanges = 3; // initial value and two validations
      merge(
        service.userHasActiveSession$.pipe(
          take(totalChanges),
          count()
        ),
        concat(
          service.validateSession(),
          service.validateSession()
        ).pipe(
          filter(() => false)
        )
      ).pipe(
        tap(c => { // count
          expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(totalChanges);
          expect(c).toBe(totalChanges);
        })
      ).subscribe();
    });
  });

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(throwError({ status: 403 }));
      service = TestBed.inject(SessionService);
    });

    it('should have `userHasActiveSession$` emit false', () => {
      service.userHasActiveSession$.pipe(
        take(1),
        tap(next => expect(next).toBeFalse())
      ).subscribe();
    });

    it('should emit null authorization data', () => {
      service.fetchAuthorizedAccess().pipe(
        tap(access => expect(access).toEqual(null))
      ).subscribe();
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      service = TestBed.inject(SessionService);
    });

    it('should have `userHasActiveSession$` emit true', () => {
      service.userHasActiveSession$.pipe(
        take(1),
        tap(next => expect(next).toBeTrue())
      ).subscribe();
    });

    it('should serve a cached result in subsequent calls to `getAuthorizedAccess()`', () => {
      concat(
        service.fetchAuthorizedAccess(),
        service.fetchAuthorizedAccess(),
        service.fetchAuthorizedAccess()
      ).pipe(
        finalize(() => expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(1))
      ).subscribe();
    });
  });
});
