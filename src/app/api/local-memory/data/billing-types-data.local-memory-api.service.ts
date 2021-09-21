/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { BillingType } from 'src/app/models/entities/BillingType';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_BILLING_TYPES } from '../mock/mock-billing-types.datasource';

@Injectable()
export class BillingTypesDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<BillingType> {

  protected items = MOCK_BILLING_TYPES.map(n => Object.assign(new BillingType(), n));

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
