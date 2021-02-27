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
import { Person } from 'src/app/models/entities/Person';
import { User } from 'src/app/models/entities/User';
import { HttpService } from 'src/app/shared/http.aservice';
import { SessionApiIService } from '../session-api.iservice';
import { sessionStorageTokenItemName, authorizationHeaderName } from 'src/environments/session-api.environment';
import { Registration } from 'src/app/models/Registration';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpSessionApiService
  extends HttpService
  implements SessionApiIService {

  protected baseURI = environment.apiUrls.session;
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

  public register(userDetails: Registration): Observable<boolean> {
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
            return true;
          } else if (response.body) {
            sessionStorage.setItem(this.sessionStorageTokenItemName, response.body);
            return true;
          }

          return false;
        }
      )
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
