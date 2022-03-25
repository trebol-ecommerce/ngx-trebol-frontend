/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { CompanyDetails } from 'src/models/CompanyDetails';

export interface IAboutPublicApiService {
  fetchCompanyDetails(): Observable<CompanyDetails>;
}
