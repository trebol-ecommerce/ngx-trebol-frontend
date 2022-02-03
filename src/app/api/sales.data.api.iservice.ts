/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from "rxjs";
import { Sell } from "src/models/entities/Sell";
import { SellDetail } from "src/models/entities/SellDetail";
import { ICompositeEntityDataApiService } from "./composite-entity.data-api.iservice";

export interface ISalesDataApiService
  extends ICompositeEntityDataApiService<Sell, SellDetail> {

  /**
   * Update status of a sell to CONFIRMED
   * @param sell The targetted sell
   */
  markAsConfirmed(sell: Sell): Observable<any>;

  /**
   * Update status of a sell to REJECTED
   * @param sell The targetted sell
   */
  markAsRejected(sell: Sell): Observable<any>;

  /**
   * Update status of a sell to COMPLETE
   * @param sell The targetted sell
   */
  markAsCompleted(sell: Sell): Observable<any>;
}
