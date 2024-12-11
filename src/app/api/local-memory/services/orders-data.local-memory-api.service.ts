/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from 'src/models/entities/Order';
import { ORDER_STATUS_NAMES_MAP } from 'src/text/order-status-names';
import { IOrdersDataApiService } from '../../orders.data.api.iservice';
import { MOCK_ORDERS } from '../mock-data/mock-orders.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class OrdersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Order>
  implements IOrdersDataApiService {

  protected items = MOCK_ORDERS.slice();

  constructor() {
    super();
  }

  fetchInnerDataFrom(order: Order) {
    return this.fetchExisting(order).pipe(
      map(s => s.details)
    );
  }

  markAsConfirmed(order: Order): Observable<any> {
    return this.fetchExisting(order).pipe(
      tap(s => { s.status = ORDER_STATUS_NAMES_MAP.get(4); })
    );
  }

  markAsRejected(order: Order): Observable<any> {
    return this.fetchExisting(order).pipe(
      tap(s => { s.status = ORDER_STATUS_NAMES_MAP.get(4); })
    );
  }

  markAsCompleted(order: Order): Observable<any> {
    return this.fetchExisting(order).pipe(
      tap(s => { s.status = ORDER_STATUS_NAMES_MAP.get(4); })
    );
  }

  protected itemExists(order: Partial<Order>) {
    return this.items.some(order2 => (order.buyOrder === order2.buyOrder));
  }

  protected getIndexOfItem(order: Partial<Order>) {
    return this.items.findIndex(order2 => (order.buyOrder === order2.buyOrder));
  }
}
