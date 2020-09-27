import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpAuthInterceptor
  implements HttpInterceptor {

  //TODO these should be refactored
  protected readonly sessionStorageTokenItemName = environment.sessionStorageTokenItemName;
  protected readonly authorizationHeader = environment.authorizationHeaderName;

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
