// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ISessionApiService } from 'src/app/api/session-api.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';
import { IAccessApiService } from 'src/app/api/access-api.iservice';

@Injectable({ providedIn: 'root' })
export class ProductManagerAccessResolver
  implements Resolve<AuthorizedAccess> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataAccess) protected apiAccessService: IAccessApiService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AuthorizedAccess>|Promise<AuthorizedAccess>|AuthorizedAccess {
    return this.apiAccessService.getResourceAuthorizedAccess('products');
  }
}
