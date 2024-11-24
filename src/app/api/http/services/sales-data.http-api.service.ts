/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Sell } from 'src/models/entities/Sell';
import { ISalesDataApiService } from '../../sales.data.api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class SalesDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Sell>
  implements ISalesDataApiService {

  constructor(http: HttpClient) {
    super(http, '/sales');
  }

  fetchExisting(sell: Partial<Sell>) {
    return this.http.get<DataPage<Sell>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(sell.buyOrder)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  fetchInnerDataFrom(item: Sell) {
    return this.fetchExisting(item).pipe(
      map(s => s.details)
    );
  }

  update(sell: Partial<Sell>) {
    return this.http.put(
      this.baseUrl,
      sell,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(sell.buyOrder)
        } })
      }
    );
  }

  delete(sell: Partial<Sell>) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(sell.buyOrder)
        } })
      }
    );
  }

  markAsConfirmed(sell: Sell): Observable<any> {
    const payload: Partial<Sell> = {};
    payload.buyOrder = sell.buyOrder;
    return this.http.post(
      `${this.baseUrl}/confirmation`,
      payload
    );
  }

  markAsRejected(sell: Sell): Observable<any> {
    const payload: Partial<Sell> = {};
    payload.buyOrder = sell.buyOrder;
    return this.http.post(
      `${this.baseUrl}/rejection`,
      payload
    );
  }

  markAsCompleted(sell: Sell): Observable<any> {
    const payload: Partial<Sell> = {};
    payload.buyOrder = sell.buyOrder;
    return this.http.post(
      `${this.baseUrl}/completion`,
      payload
    );
  }

}
