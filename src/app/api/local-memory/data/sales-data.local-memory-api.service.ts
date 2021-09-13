// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_SALES } from '../mock/mock-sales.datasource';

@Injectable()
export class SalesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Sell>
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
    return this.items.some(sell2 => (sell.id === sell2.id));
  }

  protected getIndexOfItem(sell: Partial<Sell>) {
    return this.items.findIndex(sell2 => (sell.id === sell2.id));
  }
}
