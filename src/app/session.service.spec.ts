/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat, EMPTY, merge, of, throwError } from 'rxjs';
import { count, filter, finalize, ignoreElements, skip, take, tap } from 'rxjs/operators';
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
          finalize(() => service.closeCurrentSession())
        ),
        service.userHasActiveSession$.pipe(
          take(1),
          tap(next => expect(next).toBeFalse())
        )
      ).subscribe();
    });

    it('should have `userHasActiveSession$` emit an update everytime `validateSession()` is called', () => {
      const totalChanges = 3;
      merge(
        service.userHasActiveSession$.pipe(
          take(totalChanges)
        ),
        concat(
          service.validateSession(),
          service.validateSession(),
          service.validateSession()
        )
      ).pipe(
        finalize(() => expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(totalChanges))
      ).subscribe();
    });
  });

  describe('when the user is unauthenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(throwError({ status: 403 }));
      service.validateSession();
    });

    it('should emit null authorization data', () => {
      concat(
        service.validateSession(),
        service.authorizedAccess$.pipe(
          take(1),
          tap(access => expect(access).toEqual(null))
        )
      ).subscribe();
    });
  });

  describe('when the user is authenticated', () => {
    beforeEach(() => {
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      ;
    });

    it('should have `userHasActiveSession$` emit true', () => {
      concat(
        service.validateSession(),
        service.userHasActiveSession$.pipe(
          take(1),
          tap(next => expect(next).toBeTrue())
        )
      ).subscribe();
    });

    it('should serve a cached result in subsequent calls to `fetchAuthorizedAccess()`', () => {
      concat(
        service.validateSession(), // once, besides next one
        service.fetchAuthorizedAccess(), // once
        service.fetchAuthorizedAccess(),
        service.fetchAuthorizedAccess()
      ).pipe(
        finalize(() => expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(2))
      ).subscribe();
    });
  });
});
