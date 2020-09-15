import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/data/models/entities/Session';
import { SessionDataIService } from '../auth.data.iservice';
import { HttpService } from '../../../shared/http.abstract-service';

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

  public open(details: any): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseURI}/open`,
      details
    );
  }

  public validate(ssn: Session): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/validate`,
      ssn
    );
  }

  public close(ssn: Session): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/close`,
      ssn
    );
  }
}
