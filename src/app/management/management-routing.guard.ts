import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { EmployeeRolesEnum } from 'src/app/data/enums/EmployeeRolesEnum';
import { Session } from 'src/app/data/models/entities/Session';

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
  ): Observable<boolean> {

    if (!route.parent) {
      return of(true);
    } else {
      // TODO implement proper use of role permissions
      // const modules: string[] = state.url.substr(1).split('/');
      return this.appService.isUserLoggedIn();

      // if (currentSession && currentSession.user.employee) {
      //   if (modules.length > 1) {
      //     const idCargo = currentSession.user.employee.role.id;
      //     const subModule = modules[1];
      //     const cargosAutorizados = MANAGEMENT_ROUTING_AUTH_ROLES[subModule];

      //     if (cargosAutorizados) {
      //       return cargosAutorizados.includes(idCargo);
      //     }
      //   }
      //   return true;
      // }
      // return false;

    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isPermitted(route, state).pipe(
      map(
        r => {
          if (!r) {
            return this.router.parseUrl('/')
          } else {
            return r;
          }
        }
      )
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
