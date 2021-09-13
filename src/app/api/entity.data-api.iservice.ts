// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { DataPage } from '../models/DataPage';

export interface IEntityDataApiService<T> {
  fetchPage(): Observable<DataPage<T>>;
  fetchPageFilteredBy(filters: any): Observable<DataPage<T>>;
}
