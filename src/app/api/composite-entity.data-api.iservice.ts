/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { ITransactionalEntityDataApiService } from './transactional-entity.data-api.iservice';

export interface ICompositeEntityDataApiService<T, X>
  extends ITransactionalEntityDataApiService<T> {

  fetchInnerDataFrom(itemLike: Partial<T>): Observable<X[]>;
}
