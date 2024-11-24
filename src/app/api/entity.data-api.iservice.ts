/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';
import { DataPage } from 'src/models/DataPage';

/**
 * Interface for services that fetch data from a REST API
 */
export interface IEntityDataApiService<T> {

  /**
   * Requests a paginated collection of elements
   * @param querySpec The parameters for the data request
   */
  fetchPage(querySpec: ApiDataPageQuerySpec): Observable<DataPage<T>>;
}
