/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { concat } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ManagementSidenavService } from './management-sidenav.service';

describe('ManagementSidenavService', () => {
  let service: ManagementSidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ManagementSidenavService ]
    });
    service = TestBed.inject(ManagementSidenavService);
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
      tap(() => service.toggleSidenav())
    ).subscribe();
  });
});
