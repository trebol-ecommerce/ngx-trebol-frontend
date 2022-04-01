/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SessionService } from 'src/app/session.service';
import { IAccessApiService } from '../api/access-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from '../api/api-service-injection-tokens';

@Injectable()
export class ManagementRoutingGuard
  implements CanActivate, CanActivateChild {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.access) private apiAccessService: IAccessApiService,
    private router: Router,
    private appService: SessionService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appService.validateSession().pipe(
      tap(v => { if (!v) { this.router.navigateByUrl('/'); } }));
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const childPath = route.routeConfig.path;
    if (childPath === 'dashboard') {
      return this.canActivate(route, state);
    } else {
      return this.apiAccessService.getResourceAuthorizedAccess(childPath).pipe(
        switchMap(authorizedAccess => {
          const hasPermissions = !!authorizedAccess.permissions?.length;
          if (!hasPermissions) {
            this.router.navigateByUrl('/management');
          }
          return of(hasPermissions);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigateByUrl('/management');
          } else {
            this.router.navigateByUrl('/');
          }
          return of(false);
        })
      );
    }
  }
}
