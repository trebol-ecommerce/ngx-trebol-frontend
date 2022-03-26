/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Shipper } from 'src/models/entities/Shipper';
import { MOCK_SHIPPERS } from '../mock/mock-shippers.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ShippersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Shipper> {

  protected items = MOCK_SHIPPERS.slice();

  constructor() {
    super();
  }

  protected itemExists(shipper: Partial<Shipper>) {
    return this.items.some(shipper2 => (shipper.name === shipper2.name));
  }

  protected getIndexOfItem(shipper: Partial<Shipper>) {
    return this.items.findIndex(shipper2 => (shipper.name === shipper2.name));
  }
}
