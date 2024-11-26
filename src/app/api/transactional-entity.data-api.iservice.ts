/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { IEntityDataApiService } from './entity.data-api.iservice';

/**
 * Interface for services that perform all CRUD operations against a REST API
 */
export interface ITransactionalEntityDataApiService<T>
  extends IEntityDataApiService<T> {

  /**
   *
   * @param item A item that will not conflict with existences
   */
  create(item: T): Observable<void>;

  /**
   * Will attempt to get the 'complete' item from the data store.
   * @param itemLike An object containing the item's-class-own identifiying key-value
   * property (such as id or code)
   */
  fetchExisting(itemLike: Partial<T>): Observable<T>;

  /**
   *
   * @param itemLike An object containing 1) The item's-class-own identifiying key-value
   * property (such as id or code), and 2) All other properties to be updated, with
   * their respective new values.
   * @param originalItem A copy of the item before any changes were made. Optional.
   * NOTE: added temporarily to support update of Shippers
   */
  update(itemLike: Partial<T>, originalItem?: T): Observable<void>;

  /**
   *
   * @param itemLike An object containing the item's-class-own identifiying key-value
   * property (such as id or code)
   */
  delete(itemLike: Partial<T>): Observable<void>;
}
