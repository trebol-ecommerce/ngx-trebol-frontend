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
      `${this.baseUrl}/account/profile`
    );
  }

  public updateProfile(details: Person) {
    return this.http.put<boolean>(
      `${this.baseUrl}/account/profile`,
      details
    );
  }

  public guestLogin(personDetails: Person) {
    return this.http.post<boolean>(
      `${this.baseUrl}/public/guest`,
      personDetails
    );
  }

  public register(userDetails: Registration) {
    return this.http.post<boolean>(
      `${this.baseUrl}/public/register`,
      userDetails
    );
  }

  public login(details: any) {
    return this.http.post(
      `${this.baseUrl}/public/login`,
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

  public logout() {
    return this.http.get<boolean>(
      `${this.baseUrl}/account/logout`
    ).pipe(
      finalize(
        () => {
          sessionStorage.removeItem(this.sessionStorageTokenItemName);
        }
      )
    );
  }
}
