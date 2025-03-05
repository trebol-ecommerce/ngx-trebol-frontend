/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginPublicApiService } from '../../login-public-api.iservice';

@Injectable()
export class LoginPublicHttpApiService
  implements ILoginPublicApiService {

  private readonly authorizationHeader = environment.secrets.tokenHttpHeader;
  private readonly baseUrl = `${environment.apiUrls.public}/login`;

  constructor(private http: HttpClient) { }

  login(details: any) {
    return this.http.post(
      this.baseUrl,
      details,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      map((response: HttpResponse<string>) => {
        if (response.headers.has(this.authorizationHeader)) {
          return response.headers.get(this.authorizationHeader);
        } else if (response.body) {
          const token = new RegExp('^Bearer .+$').test(response.body) ?
                          response.body :
                          `Bearer ${response.body}`
          return token;
        }
        return null;
      })
    );
  }
}
