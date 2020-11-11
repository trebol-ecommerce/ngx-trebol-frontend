// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sessionStorageTokenItemName, authorizationHeaderName } from 'src/environments/auth.environment';

@Injectable()
export class HttpSessionInterceptor
  implements HttpInterceptor {

  //TODO these should be refactored
  protected readonly sessionStorageTokenItemName = sessionStorageTokenItemName;
  protected readonly authorizationHeader = authorizationHeaderName;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeaderValue: string = sessionStorage.getItem(this.sessionStorageTokenItemName);
    if (authHeaderValue !== null) {
      const authReq = req.clone({
        headers: req.headers.append(this.authorizationHeader, authHeaderValue)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
