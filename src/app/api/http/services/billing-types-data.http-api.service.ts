/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillingType } from 'src/models/entities/BillingType';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/models/DataPage';
import { makeFetchHttpParams } from '../http-api.functions';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class BillingTypesDataHttpApiService
  implements IEntityDataApiService<BillingType> {

  private readonly baseUrl = `${environment.apiUrls.data}/billing_types`

  constructor(private http: HttpClient) { }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<BillingType>>(
      this.baseUrl,
      { params }
    );
  }
}
