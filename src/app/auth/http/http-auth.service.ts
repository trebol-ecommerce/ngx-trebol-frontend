import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { AuthenticationIService } from '../auth.iservice';

@Injectable()
export class HttpAuthService
  extends HttpService
  implements AuthenticationIService {

  protected baseURI: string = `${this.baseURI}/session`;
  //TODO these should be refactored
  protected readonly sessionStorageTokenItemName = 'nm/bearer-token';
  protected readonly authorizationHeader = 'Authorization';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getProfile(): Observable<Person> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public updateProfile(details: Person): Observable<boolean> {
    throw new Error('Method not implemented.'); // TODO implement me
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/guest`,
      personDetails
    );
  }

  public register(userDetails: User): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseURI}/register`,
      userDetails
    );
  }

  public login(details: any): Observable<boolean> {
    return this.http.post(
      `${this.baseURI}/login`,
      details,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      tap(
        response => {
          if (response.headers.has(this.authorizationHeader)) {
            console.log(this.authorizationHeader);
            sessionStorage.setItem(this.sessionStorageTokenItemName, response.headers.get(this.authorizationHeader));
          }
        }
      ),
      map(
        response => {
          if (response.body) {
            return (response.body === 'true');
          } else {
            return false;
          }
        }
      )
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
