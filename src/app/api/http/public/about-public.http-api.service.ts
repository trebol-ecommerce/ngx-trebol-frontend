/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { AboutCommerceDetails } from 'src/models/AboutCommerceDetails';
import { environment } from 'src/environments/environment';
import { IAboutPublicApiService } from '../../about-public-api.iservice';

@Injectable()
export class AboutPublicHttpApiService
  extends HttpApiService
  implements IAboutPublicApiService {

  protected baseUrl = `${environment.apiUrls.public}/about`;

  constructor(http: HttpClient) {
    super(http);
  }

  fetchCompanyDetails() {
    return this.http.get<AboutCommerceDetails>(
      this.baseUrl
    );
  }
}
