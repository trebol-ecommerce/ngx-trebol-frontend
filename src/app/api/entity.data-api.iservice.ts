/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { DataPage } from 'src/models/DataPage';

/**
 * Interface for services that fetch data from a REST API
 */
export interface IEntityDataApiService<T> {

  /**
   * Requests a paginated collection of elements
   * @param pageIndex 0-based index of page
   * @param pageSize Number of elements expected in the page
   * @param sortBy Name of parameter or metadata field to sort elements by
   * @param order Direction of sorting (ascending/descending)
   * @param filters Parameters to filter results by
   */
  fetchPage(pageIndex?: number, pageSize?: number, sortBy?: string, order?: string, filters?: any): Observable<DataPage<T>>;
}
