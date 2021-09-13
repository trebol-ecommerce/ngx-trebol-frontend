// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { DataPage } from '../models/DataPage';

export interface IEntityDataApiService<T> {
  /**
   *
   * @param item A item that will not conflict with existences
   */
  create(item: T): Observable<any>;

  /**
   * Will attempt to get the 'complete' item from the data store.
   * @param itemLike An object containing the item's-class-own identifiying key-value
   * property (such as id or code)
   */
  fetchExisting(itemLike: Partial<T>): Observable<T>;

  fetchPage(): Observable<DataPage<T>>;

  fetchPageFilteredBy(filters: any): Observable<DataPage<T>>;

  /**
   *
   * @param item An object containing 1) The item's-class-own identifiying key-value
   * property (such as id or code), and 2) All other properties to be updated, with
   * their respective new values.
   */
  update(itemLike: Partial<T>): Observable<any>;

  /**
   *
   * @param itemLike An object containing the item's-class-own identifiying key-value
   * property (such as id or code)
   */
  delete(itemLike: Partial<T>): Observable<any>;
}
