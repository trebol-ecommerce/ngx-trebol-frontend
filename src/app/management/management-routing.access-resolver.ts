/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccessApiService } from 'src/app/api/access-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';

@Injectable({ providedIn: 'root' })
export class ManagementRoutingAccessResolver
  implements Resolve<AuthorizedAccess> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.access) private apiAccessService: IAccessApiService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AuthorizedAccess> | Promise<AuthorizedAccess> | AuthorizedAccess {
    const resource = route.routeConfig.path;
    return this.apiAccessService.getResourceAuthorizedAccess(resource);
  }
}
