/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, delay, take, tap } from 'rxjs/operators';
import { ManagementRoutingService } from './management-routing.service';

describe('ManagementRoutingService', () => {
  let service: ManagementRoutingService;
  let fakeRouteData: any;
  let fakeActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    fakeRouteData = {
      title: 'dummyname'
    };
    fakeActivatedRouteSnapshot = {
      data: fakeRouteData
    } as ActivatedRouteSnapshot;
    mockRouter = {
      events: of(new ActivationEnd(fakeActivatedRouteSnapshot)).pipe(delay(5))
    };

    TestBed.configureTestingModule({
      // RouterTestingModule is not fit for providing fake route data
      providers: [
        { provide: Router, useValue: mockRouter },
        ManagementRoutingService
      ]
    });
    service = TestBed.inject(ManagementRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
