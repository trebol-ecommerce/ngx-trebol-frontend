/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { StoreService } from '../../store.service';

@Injectable()
export class StoreCartReviewGuard
  implements CanActivate {

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storeService.cartDetails$.pipe(
      take(1),
      map(details => (details.length > 0)),
      tap(v => { if (!v) { this.router.navigateByUrl('/'); } }));
  }
}
