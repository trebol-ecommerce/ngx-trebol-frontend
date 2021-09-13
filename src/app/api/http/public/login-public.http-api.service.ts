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
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { environment } from 'src/environments/environment';
import { ILoginPublicApiService } from '../../login-public-api.iservice';

@Injectable()
export class LoginPublicHttpApiService
  extends HttpApiService
  implements ILoginPublicApiService {

  baseUrl = `${environment.apiUrls.public}/login`;
  protected readonly sessionStorageTokenItemName = environment.secrets.sessionTokenName;
  protected readonly authorizationHeader = environment.secrets.authHeader;

  constructor(http: HttpClient) {
    super(http);
  }

  login(details: any) {
    return this.http.post(
      this.baseUrl,
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

  logout(): void {
    sessionStorage.removeItem(this.sessionStorageTokenItemName);
  }
}