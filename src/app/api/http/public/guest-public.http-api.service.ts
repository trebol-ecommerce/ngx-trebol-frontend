/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { Person } from 'src/models/entities/Person';
import { environment } from 'src/environments/environment';
import { IGuestPublicApiService } from '../../guest-public-api.iservice';

@Injectable()
export class GuestPublicHttpApiService
  extends HttpApiService
  implements IGuestPublicApiService {

  baseUrl = `${environment.apiUrls.public}/guest`;

  constructor(http: HttpClient) {
    super(http);
  }

  guestLogin(personDetails: Person) {
    return this.http.post<boolean>(
      this.baseUrl,
      personDetails
    );
  }
}
