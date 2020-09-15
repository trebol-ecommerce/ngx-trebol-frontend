import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../shared/http.abstract-service';
import { SessionDataIService } from '../auth.data.iservice';

@Injectable()
export class SessionsHttpDataService
  extends HttpService
  implements SessionDataIService {

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
