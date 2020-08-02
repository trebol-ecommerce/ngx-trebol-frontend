import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementChildRoute, MANAGEMENT_CHILD_ROUTES } from '../management-routing.module';
import { SidenavModuleItem } from './SidenavModuleItem';

@Component({
  selector: 'app-management-sidenav',
  templateUrl: './management-sidenav.component.html',
  styleUrls: ['./management-sidenav.component.css']
})
export class ManagementSidenavComponent {

  public baseModule = 'management';
  public modules: SidenavModuleItem[];

  constructor(
    protected router: Router
  ) {
    this.modules = MANAGEMENT_CHILD_ROUTES.map(this.routeToListItem);
  }

  protected routeToListItem(r: ManagementChildRoute): SidenavModuleItem {
    return {
      path: r.path,
      text: r.data.title,
      icon: r.data.matIcon,
      active: false
    };
  }

  public onClickNavigate(indice: number) {
    const item = this.modules[indice];
    this.modules.forEach(m => m.active = false);
    item.active = true;
  }

}
