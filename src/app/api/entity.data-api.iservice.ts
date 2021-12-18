/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { DataPage } from '../../models/DataPage';

export interface IEntityDataApiService<T> {
  fetchPage(): Observable<DataPage<T>>;
  fetchPageFilteredBy(filters: any): Observable<DataPage<T>>;
}
