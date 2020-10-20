// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.appService.isUserLoggedIn().pipe(
      map(
        r => {
          if (!r) { return this.router.parseUrl('/'); }
          return r;
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
