/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/models/DataPage';
import { IEntityDataApiService } from '../entity.data-api.iservice';
import { HttpApiService } from './http-api.abstract.service';

export abstract class EntityDataHttpApiService<T>
  extends HttpApiService
  implements IEntityDataApiService<T> {

  baseUrl = environment.apiUrls.data;
  maxIntegerValue = environment.constraints.maxIntegerValue;

  constructor(http: HttpClient, urlSuffix?: string) {
    super(http);
    if (urlSuffix) {
      this.baseUrl += urlSuffix;
    }
  }

  fetchPage(pageIndex: number, pageSize: number, sortBy?: string, order?: string, filters?: any) {
    const params = this.makeHttpParams(pageIndex, pageSize, sortBy, order, filters);

    return this.http.get<DataPage<T>>(
      this.baseUrl,
      { params }
    );
  }

  protected makeHttpParams(pageIndex: number, pageSize: number, sortBy?: string, order?: string, filters?: any) {
    let params = (!!filters) ?
      new HttpParams({ fromObject: filters }) :
      new HttpParams();

    if (!!pageIndex && pageIndex >= 0) {
      if (pageIndex >= this.maxIntegerValue) { pageIndex = this.maxIntegerValue; }
      params = params.append('pageIndex', pageIndex.toString());
    }
    if (!!pageSize && pageSize > 0) {
      if (pageSize >= this.maxIntegerValue) { pageSize = this.maxIntegerValue; }
      params = params.append('pageSize', pageSize.toString());
    }
    if (!!sortBy) {
      params = params.append('sortBy', sortBy);
    }
    if (!!order) {
      params = params.append('order', order);
    }
    return params;
  }
}
