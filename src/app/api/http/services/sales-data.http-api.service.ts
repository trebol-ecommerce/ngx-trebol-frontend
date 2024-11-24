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
import { environment } from 'src/environments/environment';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class SalesDataHttpApiService
  implements ISalesDataApiService {

  private readonly baseUrl = `${environment.apiUrls.data}/sales`;

  constructor(private http: HttpClient) { }

  create(product: Sell) {
    return this.http.post<void>(
      this.baseUrl,
      product
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Sell>>(
      this.baseUrl,
      { params }
    );
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
    return this.http.put<void>(
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
    return this.http.delete<void>(
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
