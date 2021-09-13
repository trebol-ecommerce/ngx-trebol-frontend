// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class SalesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Sell>
  implements ICompositeEntityDataApiService<Sell, SellDetail> {

  constructor(http: HttpClient) {
    super(http, '/sales');
  }

  fetchExisting(sell: Partial<Sell>) {
    return this.http.get<Sell>(
      `${this.baseUrl}/${sell.id}`
    );
  }

  fetchInnerDataFrom(item: Sell) {
    return this.fetchExisting(item).pipe(
      map(s => s.details)
    );
  }

  update(sell: Partial<Sell>) {
    return this.http.put(
      `${this.baseUrl}/${sell.id}`,
      sell
    );
  }

  delete(sell: Partial<Sell>) {
    return this.http.delete(
      `${this.baseUrl}/${sell.id}`
    );
  }

}
