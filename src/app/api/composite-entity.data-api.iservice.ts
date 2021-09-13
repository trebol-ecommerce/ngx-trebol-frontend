// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { IEntityDataApiService } from './entity.data-api.iservice';

export interface ICompositeEntityDataApiService<T, X>
  extends IEntityDataApiService<T> {

  fetchInnerDataFrom(itemLike: Partial<T>): Observable<X[]>;
}
