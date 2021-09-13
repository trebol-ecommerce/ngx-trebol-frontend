// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { regexMatchStartOfString } from 'src/functions/regexMatchStartOfString';

@Injectable()
export class SessionHttpApiInterceptor
  implements HttpInterceptor {

  // TODO these should be refactored
  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;
  protected readonly authorizationHeader = environment.secrets.authHeader;
  private readonly acceptedUrls: string[] = [
    environment.apiUrls.access,
    environment.apiUrls.data,
    environment.apiUrls.public,
    environment.apiUrls.account
  ];
  private readonly regexps: RegExp[] = [];

  constructor() {
    this.regexps = [ ...new Set(this.acceptedUrls) ].map(url => regexMatchStartOfString(url));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if the request domain matches any of our API
    const requestUrlMatchesAnyApi = this.regexps?.some(r => r.test(req.url));
    const token = sessionStorage.getItem(this.sessionStorageTokenItemName);
    if (requestUrlMatchesAnyApi && token) {
      const headers = req.headers.append(this.authorizationHeader, token);
      const authorizedRequest = req.clone({ headers });
      return next.handle(authorizedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) { // expired or invalid token
            sessionStorage.removeItem(this.sessionStorageTokenItemName);
            return next.handle(req);
          } else {
            return throwError(error);
          }
        })
      );
    }
    return next.handle(req);
  }

}
