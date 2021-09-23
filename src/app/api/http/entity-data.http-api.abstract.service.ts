/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { DataPage } from 'src/app/models/DataPage';
import { environment } from 'src/environments/environment';
import { IEntityDataApiService } from '../entity.data-api.iservice';
import { HttpApiService } from './http-api.abstract.service';

export abstract class EntityDataHttpApiService<T>
  extends HttpApiService
  implements IEntityDataApiService<T> {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient, urlSuffix?: string) {
    super(http);
    if (urlSuffix) {
      this.baseUrl += urlSuffix;
    }
  }

  fetchPage() {
    return this.http.get<DataPage<T>>(
      this.baseUrl
    );
  }

  fetchPageFilteredBy(filters: any) {
    return this.http.get<DataPage<T>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: filters })
      }
    );
  }

}
