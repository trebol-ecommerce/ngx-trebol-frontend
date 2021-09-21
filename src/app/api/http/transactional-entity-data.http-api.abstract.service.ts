/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITransactionalEntityDataApiService } from '../transactional-entity.data-api.iservice';
import { EntityDataHttpApiService } from './entity-data.http-api.abstract.service';

export abstract class TransactionalEntityDataHttpApiService<T>
  extends EntityDataHttpApiService<T>
  implements ITransactionalEntityDataApiService<T> {

  constructor(http: HttpClient, urlSuffix?: string) {
    super(http);
    if (urlSuffix) {
      this.baseUrl += urlSuffix;
    }
  }

  create(item: T) {
    return this.http.post<any>(
      this.baseUrl,
      item
    );
  }

  abstract fetchExisting(itemLike: Partial<T>): Observable<T>;

  abstract update(itemLike: Partial<T>): Observable<any>;

  abstract delete(itemLike: Partial<T>): Observable<any>;
}
