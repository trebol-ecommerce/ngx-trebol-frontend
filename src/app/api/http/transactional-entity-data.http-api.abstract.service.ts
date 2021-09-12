// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReadOnlyEntityDataHttpApiService } from './entity-data.http-api.abstract.service';

export abstract class TransactionalEntityDataHttpApiService<T>
  extends ReadOnlyEntityDataHttpApiService<T> {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient) {
    super(http);
  }

  create(instance: T) {
    return this.http.post<void>(
      this.baseUrl,
      instance
    );
  }

  update(instance: T, id: number) {
    return this.http.put<void>(
      `${this.baseUrl}/${id}`,
      instance
    );
  }

  deleteById(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/${id}`
    );
  }
}
