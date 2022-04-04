/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, concat, EMPTY, from, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IAccessApiService } from './api/access-api.iservice';
import { API_INJECTION_TOKENS } from './api/api-injection-tokens';
import { AuthorizationService } from './authorization.service';
import { SessionService } from './session.service';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let accessApiServiceSpy: jasmine.SpyObj<IAccessApiService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(() => {
    const mockAccessApiService = jasmine.createSpyObj('IAccessApiService', ['getAuthorizedAccess']);
    const mockSessionService = jasmine.createSpyObj('SessionService', ['closeCurrentSession', 'userHasActiveSession$']);

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.access, useValue: mockAccessApiService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    });
    accessApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.access) as jasmine.SpyObj<IAccessApiService>;
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
  });

  describe('always', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = EMPTY;
      service = TestBed.inject(AuthorizationService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should call `ngOnDestroy()` without errors', () => {
      expect(() => {
        service.ngOnDestroy();
      }).not.toThrow();
    });
  });

  describe('normally', () => {
    let activeSessionStateSource: BehaviorSubject<boolean>;

    beforeEach(() => {
      activeSessionStateSource = new BehaviorSubject(false);
      sessionServiceSpy.userHasActiveSession$ = activeSessionStateSource.asObservable();
      service = TestBed.inject(AuthorizationService);
    });

    it('should update authorization details against the external API whenever the user logs back in', () => {
      from([true, false, true, false, true, false]).pipe(
        tap(newState => activeSessionStateSource.next(newState)),
        finalize(() => {
          // each change to true means one call to the API
          expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(3);
        })
      ).subscribe();
    });

    afterAll(() => {
      activeSessionStateSource.complete();
    });
  })

  describe('when user is unauthenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(false);
      service = TestBed.inject(AuthorizationService);
    });

    it('should inmediately emit null authorization data', () => {
      service.getAuthorizedAccess().pipe(
        tap(access => expect(access).toEqual(null))
      ).subscribe();
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      sessionServiceSpy.userHasActiveSession$ = of(true);
      accessApiServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      service = TestBed.inject(AuthorizationService);
    });

    it('should inmediately update authorization details with the external API', () => {
      expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalled();
    });

    it('should serve a cached result in subsequent calls to `getAuthorizedAccess()`', () => {
      concat(
        service.getAuthorizedAccess(),
        service.getAuthorizedAccess(),
        service.getAuthorizedAccess()
      ).pipe(
        finalize(() => expect(accessApiServiceSpy.getAuthorizedAccess).toHaveBeenCalledTimes(1))
      ).subscribe();
    });
  });

});
