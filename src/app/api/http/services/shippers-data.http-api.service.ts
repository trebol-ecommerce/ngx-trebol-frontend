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
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ShippersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Shipper> {

  constructor(http: HttpClient) {
    super(http, '/shippers');
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
    return this.http.put(
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
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(shipper.name)
        } })
      }
    );
  }
}
