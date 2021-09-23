/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { MOCK_SALES } from '../mock/mock-sales.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class SalesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Sell>
  implements ICompositeEntityDataApiService<Sell, SellDetail> {

  protected items: Sell[] = MOCK_SALES.map(n => Object.assign(new Sell(), n));

  constructor() {
    super();
  }

  fetchInnerDataFrom(sell: Sell) {
    return this.fetchExisting(sell).pipe(
      map(s => s.details)
    );
  }

  protected itemExists(sell: Partial<Sell>) {
    return this.items.some(sell2 => (sell.buyOrder === sell2.buyOrder));
  }

  protected getIndexOfItem(sell: Partial<Sell>) {
    return this.items.findIndex(sell2 => (sell.buyOrder === sell2.buyOrder));
  }
}
