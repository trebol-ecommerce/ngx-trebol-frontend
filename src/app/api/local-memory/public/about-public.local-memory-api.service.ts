/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyDetails } from 'src/models/CompanyDetails';
import { IAboutPublicApiService } from '../../about-public-api.iservice';
import { MOCK_COMPANY_DETAILS } from '../mock/mock-company-details.examples';

@Injectable()
export class AboutPublicLocalMemoryApiService
  implements IAboutPublicApiService {

  constructor() { }

  fetchCompanyDetails(): Observable<CompanyDetails> {
    return of(MOCK_COMPANY_DETAILS);
  }
}
