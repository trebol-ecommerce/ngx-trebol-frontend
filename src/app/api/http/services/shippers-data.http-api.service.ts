/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Shipper } from 'src/models/entities/Shipper';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { environment } from 'src/environments/environment';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class ShippersDataHttpApiService
  implements ITransactionalEntityDataApiService<Shipper> {

  private readonly baseUrl = `${environment.apiUrls.data}/shippers`;

  constructor(private http: HttpClient) { }

  create(product: Shipper) {
    return this.http.post<void>(
      this.baseUrl,
      product
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Shipper>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(shipper: Shipper) {
    return this.http.get<DataPage<Shipper>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(shipper.name)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(shipper: Shipper, originalShipper?: Shipper) {
    return this.http.put<void>(
      this.baseUrl,
      shipper,
      {
        params: new HttpParams({ fromObject: {
          name: String(originalShipper.name)
        } })
      }
    );
  }

  delete(shipper: Shipper) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(shipper.name)
        } })
      }
    );
  }
}
