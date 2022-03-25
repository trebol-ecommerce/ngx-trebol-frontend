/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sell } from 'src/models/entities/Sell';
import { SELL_STATUS_NAMES_MAP } from 'src/text/sell-status-names';
import { ISalesDataApiService } from '../../sales.data.api.iservice';
import { MOCK_SALES } from '../mock/mock-sales.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class SalesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Sell>
  implements ISalesDataApiService {

  protected items = MOCK_SALES.slice();

  constructor() {
    super();
  }

  fetchInnerDataFrom(sell: Sell) {
    return this.fetchExisting(sell).pipe(
      map(s => s.details)
    );
  }

  markAsConfirmed(sell: Sell): Observable<any> {
    return this.fetchExisting(sell).pipe(
      tap(s => s.status = SELL_STATUS_NAMES_MAP.get(4))
    );
  }

  markAsRejected(sell: Sell): Observable<any> {
    return this.fetchExisting(sell).pipe(
      tap(s => s.status = SELL_STATUS_NAMES_MAP.get(4))
    );
  }

  markAsCompleted(sell: Sell): Observable<any> {
    return this.fetchExisting(sell).pipe(
      tap(s => s.status = SELL_STATUS_NAMES_MAP.get(4))
    );
  }

  protected itemExists(sell: Partial<Sell>) {
    return this.items.some(sell2 => (sell.buyOrder === sell2.buyOrder));
  }

  protected getIndexOfItem(sell: Partial<Sell>) {
    return this.items.findIndex(sell2 => (sell.buyOrder === sell2.buyOrder));
  }
}
