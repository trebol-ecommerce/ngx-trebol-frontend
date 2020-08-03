import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ManagementChildRoute, MANAGEMENT_CHILD_ROUTES } from '../management-routing.module';
import { ManagementService } from '../management.service';
import { SidenavModuleItem } from './SidenavModuleItem';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent
  implements OnInit, OnDestroy {

  protected modules: SidenavModuleItem[] = [];
  protected modulesSource: Subject<SidenavModuleItem[]> = new BehaviorSubject(this.modules);
  protected activeRouteSubscription: Subscription;

  public modules$: Observable<SidenavModuleItem[]> = this.modulesSource.asObservable();
  public readonly baseModule = '/management';

  constructor(
    protected service: ManagementService,
    protected router: Router
  ) {
  }

  protected routeToListItem(r: ManagementChildRoute): SidenavModuleItem {
    return {
      path: r.path,
      text: r.data.title,
      icon: r.data.matIcon,
      active: false
    };
  }

  ngOnInit(): void {
    this.modules = MANAGEMENT_CHILD_ROUTES.map(this.routeToListItem);
    this.modulesSource.next(this.modules);

    this.activeRouteSubscription = this.service.activeRouteSnapshot$.subscribe(
      (route: ActivatedRouteSnapshot) => {
        console.log(route);
        const mIndex = this.modules.findIndex(v => v.path === route.url[0].path);
        if (mIndex !== -1) {
          for (let m of this.modules) { m.active = false; }
          this.modules[mIndex].active = true;
          this.modulesSource.next(this.modules);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.activeRouteSubscription.unsubscribe();
  }

}
