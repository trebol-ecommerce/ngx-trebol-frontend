/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from "rxjs";
import { Order } from "src/models/entities/Order";
import { OrderDetail } from "src/models/entities/OrderDetail";
import { ICompositeEntityDataApiService } from "./composite-entity.data-api.iservice";

export interface IOrdersDataApiService
  extends ICompositeEntityDataApiService<Order, OrderDetail> {

  /**
   * Update status of a order to CONFIRMED
   * @param order The targetted order
   */
  markAsConfirmed(order: Order): Observable<void>;

  /**
   * Update status of a order to REJECTED
   * @param order The targetted order
   */
  markAsRejected(order: Order): Observable<void>;

  /**
   * Update status of a order to COMPLETE
   * @param order The targetted order
   */
  markAsCompleted(order: Order): Observable<void>;
}
