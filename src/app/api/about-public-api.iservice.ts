/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { AboutCommerceDetails } from 'src/models/AboutCommerceDetails';

export interface IAboutPublicApiService {
  fetchCompanyDetails(): Observable<AboutCommerceDetails>;
}
