// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AuthorizedAccess } from 'src/app/data/models/AuthorizedAccess';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { HttpService } from 'src/app/shared/http.abstract-service';
import { AuthenticationIService } from '../auth.iservice';
import { sessionStorageTokenItemName, authorizationHeaderName, baseURI } from 'src/environments/auth.environment';

@Injectable()
export class HttpAuthService
  extends HttpService
  implements AuthenticationIService {

  protected baseURI = baseURI;
  protected readonly sessionStorageTokenItemName = sessionStorageTokenItemName;
  protected readonly authorizationHeader = authorizationHeaderName;

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public getProfile(): Observable<Person> {
    return this.http.get<Person>(
      `${this.baseURI}/profile`
    );
  }

  public updateProfile(details: Person): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseURI}/profile`,
      details
    );
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
      map(
        response => {
          if (response.headers.has(this.authorizationHeader)) {
            sessionStorage.setItem(this.sessionStorageTokenItemName, response.headers.get(this.authorizationHeader));
            this.getAuthorizedAccess().subscribe();
            return true;
          } else if (response.body) {
            sessionStorage.setItem(this.sessionStorageTokenItemName, response.body);
            this.getAuthorizedAccess().subscribe();
            return true;
          }

          return false;
        }
      )
    );
  }
  
  
  public getAuthorizedAccess(): Observable<AuthorizedAccess> {
    return this.http.get<AuthorizedAccess>(
      `${this.baseURI}/api`
    );
  }
  
  public getResourceAuthorizedAccess(resource: string): Observable<AuthorizedAccess> {
    return this.http.get<AuthorizedAccess>(
      `${this.baseURI}/api/${resource}`
    );
  }

  public logout(): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseURI}/logout`
    ).pipe(
      finalize(
        () => {
          sessionStorage.removeItem(this.sessionStorageTokenItemName);
        }
      )
    );
  }
}
