/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shipper } from 'src/app/models/entities/Shipper';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class ShippersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Shipper>
  implements IEntityDataApiService<Shipper> {

  constructor(http: HttpClient) {
    super(http, '/shippers');
  }

  fetchExisting(shipper: Shipper) {
    return this.http.get<Shipper>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          name: String(shipper.name)
        } })
      }
    );
  }

  update(shipper: Shipper) {
    return this.http.put(
      this.baseUrl,
      shipper,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(shipper.name)
        } })
      }
    );
  }

  delete(shipper: Shipper) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(shipper.name)
        } })
      }
    );
  }
}
