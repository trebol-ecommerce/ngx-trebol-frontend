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
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { ISessionApiService } from '../../session-api.iservice';
import { Registration } from 'src/app/models/Registration';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionHttpApiService
  extends HttpApiService
  implements ISessionApiService {

  baseUrl = environment.apiUrls.session
  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;
  protected readonly authorizationHeader = environment.secrets.authHeader;

  constructor(http: HttpClient) {
    super(http);
  }

  public getProfile(): Observable<Person> {
    return this.http.get<Person>(
      `${this.baseUrl}/profile`
    );
  }

  public updateProfile(details: Person): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.baseUrl}/profile`,
      details
    );
  }

  public guestLogin(personDetails: Person): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/guest`,
      personDetails
    );
  }

  public register(userDetails: Registration): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/register`,
      userDetails
    );
  }

  public login(details: any): Observable<boolean> {
    return this.http.post(
      `${this.baseUrl}/login`,
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
      `${this.baseUrl}/logout`
    ).pipe(
      finalize(
        () => {
          sessionStorage.removeItem(this.sessionStorageTokenItemName);
        }
      )
    );
  }
}
