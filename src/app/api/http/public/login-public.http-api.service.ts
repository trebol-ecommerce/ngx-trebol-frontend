/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { environment } from 'src/environments/environment';
import { ILoginPublicApiService } from '../../login-public-api.iservice';

@Injectable()
export class LoginPublicHttpApiService
  extends HttpApiService
  implements ILoginPublicApiService {

  private readonly authorizationHeader = environment.secrets.tokenHttpHeader;

  baseUrl = `${environment.apiUrls.public}/login`;

  constructor(http: HttpClient, private router: Router) {
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
      map(response => {
        if (response.headers.has(this.authorizationHeader)) {
          return response.headers.get(this.authorizationHeader);
        } else if (response.body) {
          const token = new RegExp('$Bearer .+^').test(response.body) ?
                          response.body :
                          `Bearer ${response.body}`
          return token;
        }
        return null;
      })
    );
  }
}
