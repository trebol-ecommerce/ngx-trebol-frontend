/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Keeps track of the latest navigated route
 */
@Injectable()
export class ManagementRoutingService
  implements OnDestroy {

  private currentRouteSnapshotSource = new ReplaySubject<ActivatedRouteSnapshot>(1);

  currentRouteSnapshot$ = this.currentRouteSnapshotSource.asObservable();
  currentPageName$: Observable<string>;

  constructor() {
    this.currentPageName$ = this.currentRouteSnapshot$.pipe(
      map(snapshot => (snapshot.data['title'] || ''))
    );
  }

  ngOnDestroy(): void {
    this.currentRouteSnapshotSource.complete();
  }

  updateCurrentRoute(route: ActivatedRouteSnapshot) {
    this.currentRouteSnapshotSource.next(route);
  }
}
