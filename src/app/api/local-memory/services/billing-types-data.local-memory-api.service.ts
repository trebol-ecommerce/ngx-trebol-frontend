/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { BillingType } from 'src/models/entities/BillingType';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_BILLING_TYPES } from '../mock-data/mock-billing-types.datasource';

@Injectable()
export class BillingTypesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<BillingType> {

  protected items = MOCK_BILLING_TYPES.slice();

  constructor() {
    super();
  }

  protected itemExists(billingType: Partial<BillingType>) {
    return this.items.some(billingType2 => (billingType.name === billingType2.name));
  }

  protected getIndexOfItem(billingType: Partial<BillingType>) {
    return this.items.findIndex(billingType2 => (billingType.name === billingType2.name));
  }
}
