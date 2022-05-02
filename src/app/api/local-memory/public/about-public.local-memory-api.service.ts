/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutCommerceDetails } from 'src/models/AboutCommerceDetails';
import { IAboutPublicApiService } from '../../about-public-api.iservice';
import { MOCK_ABOUT_COMMERCE_DETAILS } from '../mock/mock-about-commerce-details.examples';

@Injectable()
export class AboutPublicLocalMemoryApiService
  implements IAboutPublicApiService {

  constructor() { }

  fetchCompanyDetails(): Observable<AboutCommerceDetails> {
    return of(MOCK_ABOUT_COMMERCE_DETAILS);
  }
}
