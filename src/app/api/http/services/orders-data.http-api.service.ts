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
import { Order } from 'src/models/entities/Order';
import { IOrdersDataApiService } from '../../orders.data.api.iservice';
import { environment } from 'src/environments/environment';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class OrdersDataHttpApiService
  implements IOrdersDataApiService {

  private readonly baseUrl = `${environment.apiUrls.data}/orders`;

  constructor(private http: HttpClient) { }

  create(order: Order) {
    return this.http.post<void>(
      this.baseUrl,
      order
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Order>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(order: Partial<Order>) {
    return this.http.get<DataPage<Order>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(order.buyOrder)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  fetchInnerDataFrom(order: Order) {
    return this.fetchExisting(order).pipe(
      map(s => s.details)
    );
  }

  update(order: Partial<Order>) {
    return this.http.put<void>(
      this.baseUrl,
      order,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(order.buyOrder)
        } })
      }
    );
  }

  delete(order: Partial<Order>) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          buyOrder: String(order.buyOrder)
        } })
      }
    );
  }

  markAsConfirmed(order: Order): Observable<any> {
    const payload: Partial<Order> = {};
    payload.buyOrder = order.buyOrder;
    return this.http.post(
      `${this.baseUrl}/confirmation`,
      payload
    );
  }

  markAsRejected(order: Order): Observable<any> {
    const payload: Partial<Order> = {};
    payload.buyOrder = order.buyOrder;
    return this.http.post(
      `${this.baseUrl}/rejection`,
      payload
    );
  }

  markAsCompleted(order: Order): Observable<any> {
    const payload: Partial<Order> = {};
    payload.buyOrder = order.buyOrder;
    return this.http.post(
      `${this.baseUrl}/completion`,
      payload
    );
  }

}
