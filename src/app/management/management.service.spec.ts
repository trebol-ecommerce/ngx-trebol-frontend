/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { ManagementService } from './management.service';

describe('ManagementService', () => {
  let service: ManagementService;
  let fakeRouteData: any;
  let fakeActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(() => {
    fakeRouteData = {
      title: 'dummyname'
    };
    fakeActivatedRouteSnapshot = {
      data: fakeRouteData
    } as ActivatedRouteSnapshot;
    mockRouter = {
      events: of(new ActivationEnd(fakeActivatedRouteSnapshot))
    };
    mockActivatedRoute = {
      snapshot: fakeActivatedRouteSnapshot
    };

    TestBed.configureTestingModule({
      // RouterTestingModule is not fit for providing fake route data
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ManagementService
      ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the sidenav state', () => {
    concat(
      service.isSidenavOpen$.pipe(
        take(1),
        tap(state => expect(state).toBeTrue())
      ),
      service.isSidenavOpen$.pipe(
        take(1),
        tap(state => expect(state).toBeFalse())
      ),
      service.isSidenavOpen$.pipe(
        take(1),
        tap(state => expect(state).toBeTrue())
      )
    ).pipe(
      tap(() => service.switchSidenav())
    ).subscribe();
  });

  it('should expose the current route name', () => {
    service.currentPageName$.pipe(
      take(1),
      tap(name => expect(name).toBe(fakeRouteData.title)),
      catchError(err => {
        fail(err);
        return of(void 0);
      })
    ).subscribe();
  });
});
