/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization.service';
import { MANAGEMENT_CHILD_ROUTES } from 'src/app/management/management-routing.module';
import { ManagementService } from 'src/app/management/management.service';
import { ManagementChildRoute } from "src/app/management/ManagementChildRoute";
import { SidenavModuleItem } from './SidenavModuleItem';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent
  implements OnInit, OnDestroy {

  private modules: SidenavModuleItem[] = [];
  private modulesSource = new BehaviorSubject<SidenavModuleItem[]>([]);
  private activeRouteSubscription: Subscription;

  modules$ = this.modulesSource.asObservable();

  constructor(
    private service: ManagementService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authorizationService.getAuthorizedAccess().pipe(
      tap(access => {
        this.modules = MANAGEMENT_CHILD_ROUTES
          .filter(r => access.routes.includes(r.path) || r.path === 'dashboard')
          .map(this.routeToListItem);
        this.modulesSource.next(this.modules);
      })
    ).subscribe();

    this.activeRouteSubscription = this.service.getActiveRouteSnapshotObservable().pipe(
      tap(routeSnapshot => {
        const mIndex = this.modules.findIndex(v => v.path === routeSnapshot?.url[0]?.path);
        if (mIndex !== -1) {
          for (const m of this.modules) { m.active = false; }
          this.modules[mIndex].active = true;
          this.modulesSource.next(this.modules);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.activeRouteSubscription?.unsubscribe();
  }

  private routeToListItem(r: ManagementChildRoute): SidenavModuleItem {
    return {
      path: r.path,
      text: r.data.title,
      icon: r.data.matIcon,
      active: false
    };
  }

}
