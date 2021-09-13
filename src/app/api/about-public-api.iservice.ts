// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { CompanyDetails } from 'src/app/models/CompanyDetails';

export interface IAboutPublicApiService {
  fetchCompanyDetails(): Observable<CompanyDetails>;
}
