// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { BillingType } from 'src/app/models/entities/BillingType';

export interface IBillingTypesDataApiService {
  readAllBillingTypes(): Observable<BillingType[]>;
}
