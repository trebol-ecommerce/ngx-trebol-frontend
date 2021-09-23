/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { MANAGEMENT_CHILD_ROUTES } from 'src/app/management/management-routing.module';
import { ManagementChildRoute } from "src/app/management/ManagementChildRoute";
import { ManagementService } from 'src/app/management/management.service';
import { SidenavModuleItem } from './SidenavModuleItem';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent
  implements OnInit, OnDestroy {

  private modules: SidenavModuleItem[] = [];
  private modulesSource: Subject<SidenavModuleItem[]> = new BehaviorSubject(this.modules);
  private activeRouteSubscription: Subscription;

  modules$: Observable<SidenavModuleItem[]> = this.modulesSource.asObservable();
  readonly baseModule = '/management';

  constructor(
    private service: ManagementService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.getAuthorizedAccess().subscribe(
      access => {
        this.modules = MANAGEMENT_CHILD_ROUTES
          .filter(r => access.routes.includes(r.path) || r.path === 'dashboard')
          .map(this.routeToListItem);
        this.modulesSource.next(this.modules);
      }
    );

    this.activeRouteSubscription = this.service.activeRouteSnapshot$.subscribe(
      (route: ActivatedRouteSnapshot) => {
        const mIndex = this.modules.findIndex(v => v.path === route?.url[0]?.path);
        if (mIndex !== -1) {
          for (const m of this.modules) { m.active = false; }
          this.modules[mIndex].active = true;
          this.modulesSource.next(this.modules);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.activeRouteSubscription.unsubscribe();
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
