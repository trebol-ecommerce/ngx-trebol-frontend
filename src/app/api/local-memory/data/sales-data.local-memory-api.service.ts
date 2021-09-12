// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from '../../composite-entity.data-api.iservice';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_SALES } from './sources/mock-sales.datasource';

@Injectable()
export class SalesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Sell>
  implements ICompositeEntityDataApiService<Sell, SellDetail> {

  protected items: Sell[] = MOCK_SALES.map(n => Object.assign(new Sell(), n));

  constructor() {
    super();
  }

  public readDetailsById(id: number): Observable<SellDetail[]> {
    return this.readById(id).pipe(
      map(s => s.details)
    );
  }
}
