// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { SessionIService } from 'src/app/api/session/session.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

@Injectable({ providedIn: 'root' })
export class ProductManagerAccessResolver
  implements Resolve<AuthorizedAccess> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.auth) protected authService: SessionIService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AuthorizedAccess>|Promise<AuthorizedAccess>|AuthorizedAccess {
    return this.authService.getResourceAuthorizedAccess('product');
  }
}
