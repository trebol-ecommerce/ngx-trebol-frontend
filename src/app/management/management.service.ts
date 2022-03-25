/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';

@Injectable()
export class ManagementService
  implements OnDestroy {

  private isSidenavOpen = true;
  private isSidenavOpenSource = new BehaviorSubject(true);

  isSidenavOpen$ = this.isSidenavOpenSource.asObservable();
  activeRouteSnapshot$: Observable<ActivatedRouteSnapshot>;
  currentPageName$: Observable<string>;

  constructor(
    private router: Router
  ) {

    this.activeRouteSnapshot$ = this.router.events.pipe(
      filter(ev => ev instanceof ActivationEnd),
      throttleTime(50),
      map(ev => (ev as ActivationEnd).snapshot)
    );

    this.currentPageName$ = this.activeRouteSnapshot$.pipe(
      map(snap => snap.data.title as string)
    );
  }

  switchSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isSidenavOpenSource.next(this.isSidenavOpen);
  }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
  }
}
