// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityDataHttpApiService } from './entity-data.http-api.abstract.service';
import { Observable } from 'rxjs';
import { IEntityDataApiService } from '../entity.data-api.iservice';

export abstract class TransactionalEntityDataHttpApiService<T>
  extends EntityDataHttpApiService<T>
  implements IEntityDataApiService<T> {

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

  abstract update(itemLike: Partial<T>): Observable<any>;

  abstract delete(itemLike: Partial<T>): Observable<any>;
}
