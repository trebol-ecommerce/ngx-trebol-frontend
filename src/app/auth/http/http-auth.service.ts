import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { AuthenticationIService } from '../auth.iservice';

@Injectable()
export class HttpAuthService
  extends HttpService
  implements AuthenticationIService {

  protected baseURI = this.baseURI + '/session';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public login(details: any): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/login`,
      details
    );
  }

  public validate(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseURI}/validate`
    );
  }

  public logout(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseURI}/logout`
    );
  }
}
