/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/models/entities/Person';
import { environment } from 'src/environments/environment';
import { IGuestPublicApiService } from '../../guest-public-api.iservice';
import { map } from 'rxjs/operators';

@Injectable()
export class GuestPublicHttpApiService
  implements IGuestPublicApiService {

  private readonly authorizationHeader = environment.secrets.tokenHttpHeader;
  private readonly baseUrl = `${environment.apiUrls.public}/guest`;

  constructor(private http: HttpClient) { }

  guestLogin(personDetails: Person) {
    return this.http.post(
      this.baseUrl,
      personDetails,
      {
        observe: 'response',
        responseType: 'text'
      }
    ).pipe(
      map(response => {
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
