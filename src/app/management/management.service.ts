/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { filter, map, mapTo, tap, throttleTime } from 'rxjs/operators';

/**
 * Keeps track of general shared data in the management module, such as the sidenav state and the name of the active path
 */
@Injectable()
export class ManagementService
  implements OnDestroy {

  private isSidenavOpenSource = new BehaviorSubject(true);
  private currentPageNameSource = new ReplaySubject<string>(1);
  private activeRouteSub: Subscription;

  isSidenavOpen$ = this.isSidenavOpenSource.asObservable();
  currentPageName$ = this.currentPageNameSource.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.activeRouteSub = this.getActiveRouteSnapshotObservable().pipe(
      map(routeSnapshot => routeSnapshot.data?.title as string),
      tap(name => { this.currentPageNameSource.next(name); })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
    this.activeRouteSub?.unsubscribe();
  }

  switchSidenav(): void {
    this.isSidenavOpenSource.next(!this.isSidenavOpenSource.value);
  }

  getActiveRouteSnapshotObservable() {
    return this.router.events.pipe(
      filter(ev => ev instanceof ActivationEnd),
      throttleTime(50),
      mapTo(this.route.snapshot)
    );
  }
}
