// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { AUTH_INJECTION_TOKEN } from 'src/app/auth/auth.injection-token';
import { AuthenticationIService } from 'src/app/auth/auth.iservice';

@Injectable()
export class ManagementService
  implements OnDestroy {

  protected isSidenavOpen: boolean = true;
  protected isSidenavOpenSource: Subject<boolean> = new BehaviorSubject(this.isSidenavOpen);

  public isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource.asObservable();
  public activeRouteSnapshot$: Observable<ActivatedRouteSnapshot>;
  public currentPageName$: Observable<string>;

  constructor(
    @Inject(AUTH_INJECTION_TOKEN) protected authService: AuthenticationIService,
    protected router: Router
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

  public switchSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isSidenavOpenSource.next(this.isSidenavOpen);
  }

  ngOnDestroy(): void {
    this.isSidenavOpenSource.complete();
  }
}
