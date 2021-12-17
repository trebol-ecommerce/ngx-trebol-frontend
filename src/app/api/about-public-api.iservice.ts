/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { CompanyDetails } from 'src/models/CompanyDetails';

export interface IAboutPublicApiService {
  fetchCompanyDetails(): Observable<CompanyDetails>;
}
