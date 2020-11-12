// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { SessionApiIService } from 'src/app/api/session/session-api.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

@Injectable({ providedIn: 'root' })
export class SellManagerAccessResolver
  implements Resolve<AuthorizedAccess> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.auth) protected authService: SessionApiIService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AuthorizedAccess>|Promise<AuthorizedAccess>|AuthorizedAccess {
    return this.authService.getResourceAuthorizedAccess('sell');
  }
}
