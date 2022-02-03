/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<Sell>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(sell.buyOrder)
        } })
      }
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
    return this.http.post(
      `${this.baseUrl}/confirmation`,
      sell
    );
  }

  markAsRejected(sell: Sell): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/rejection`,
      sell
    );
  }

  markAsCompleted(sell: Sell): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/completion`,
      sell
    );
  }

}
