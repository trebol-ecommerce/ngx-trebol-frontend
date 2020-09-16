import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { EmployeeRolesEnum } from 'src/data/enums/EmployeeRolesEnum';
import { Session } from 'src/data/models/entities/Session';

export const MANAGEMENT_ROUTING_AUTH_ROLES: { [key: string]: EmployeeRolesEnum[]; } = {
  dashboard: [EmployeeRolesEnum.Administrador, EmployeeRolesEnum.Encargado, EmployeeRolesEnum.Vendedor],
  clients: [EmployeeRolesEnum.Administrador],
  employees: [EmployeeRolesEnum.Administrador],
  products: [EmployeeRolesEnum.Administrador, EmployeeRolesEnum.Encargado],
  providers: [EmployeeRolesEnum.Administrador, EmployeeRolesEnum.Encargado],
  sales: [EmployeeRolesEnum.Administrador, EmployeeRolesEnum.Vendedor],
  purchase_orders: [EmployeeRolesEnum.Administrador, EmployeeRolesEnum.Encargado],
  users: [EmployeeRolesEnum.Administrador]
};

@Injectable()
export class ManagementRoutingGuard
  implements CanActivate, CanActivateChild {

  public path: ActivatedRouteSnapshot[];
  public route: ActivatedRouteSnapshot;

  constructor(
    protected router: Router,
    protected appService: AppService
  ) {

  }

  protected isPermitted(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!route.parent) {
      return true;
    } else {
      const modules: string[] = state.url.substr(1).split('/');
      const currentSession: Session = this.appService.getCurrentSession();

      if (currentSession && currentSession.user.employee) {
        if (modules.length > 1) {
          const idCargo = currentSession.user.employee.role.id;
          const subModule = modules[1];
          const cargosAutorizados = MANAGEMENT_ROUTING_AUTH_ROLES[subModule];

          if (cargosAutorizados) {
            return cargosAutorizados.includes(idCargo);
          }
        }
        return true;
      }
      return false;

    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = this.isPermitted(route, state);

    if (!result) {
      this.router.navigateByUrl('/');
    }
    return result;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
