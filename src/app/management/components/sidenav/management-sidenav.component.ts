/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { SessionService } from 'src/app/session.service';
import { MANAGEMENT_CHILD_ROUTES } from '../../management-routing.module';
import { ManagementRoutingService } from '../../management-routing.service';
import { SidenavModuleItem } from './SidenavModuleItem';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent
  implements OnInit {

  modules$: Observable<SidenavModuleItem[]>;

  constructor(
    private routingService: ManagementRoutingService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.modules$ = concat(
      this.fetchAuthorizedModules(),
      this.reflectChangesOnActiveRoute()
    );
  }

  private fetchAuthorizedModules() {
    return this.sessionService.fetchAuthorizedAccess().pipe(
      take(1),
      map(access => MANAGEMENT_CHILD_ROUTES
        .filter(r => (access.routes.includes(r.path) || r.path === 'dashboard'))
        .map(r => ({
          path: r.path,
          text: r.data.title,
          icon: r.data.matIcon,
          active: false
        }))
      )
    );
  }

  private reflectChangesOnActiveRoute() {
    return this.watchNavigatedRoutePath().pipe(
      switchMap(latestRoutePath => this.modules$.pipe(
        take(1),
        tap(arr => {
          arr.forEach(m => { m.active = false; });
          arr.find(someModule => (someModule.path === latestRoutePath)).active = true;
        })
      ))
    );
  }

  private watchNavigatedRoutePath() {
    return this.routingService.currentRouteSnapshot$.pipe(
      map(routeSnapshot => routeSnapshot?.url[0]?.path),
      filter(routePath => !!routePath)
    );
  }

}
