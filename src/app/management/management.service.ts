// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { SessionApiIService } from 'src/app/api/session/session-api.iservice';

@Injectable()
export class ManagementService
  implements OnDestroy {

  protected isSidenavOpen: boolean = true;
  protected isSidenavOpenSource: Subject<boolean> = new BehaviorSubject(this.isSidenavOpen);

  public isSidenavOpen$: Observable<boolean> = this.isSidenavOpenSource.asObservable();
  public activeRouteSnapshot$: Observable<ActivatedRouteSnapshot>;
  public currentPageName$: Observable<string>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.auth) protected authService: SessionApiIService,
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
