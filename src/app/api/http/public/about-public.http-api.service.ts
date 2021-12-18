/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/api/http/http-api.abstract.service';
import { CompanyDetails } from 'src/models/CompanyDetails';
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
    return this.http.get<CompanyDetails>(
      this.baseUrl
    );
  }
}
