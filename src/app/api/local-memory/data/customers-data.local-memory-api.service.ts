/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/entities/Customer';
import { MOCK_CUSTOMERS } from '../mock/mock-customers.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class CustomersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Customer> {

  protected items: Customer[] = MOCK_CUSTOMERS.map(n => Object.assign(new Customer(), n));

  constructor() {
    super();
  }

  protected itemExists(customer: Partial<Customer>) {
    return this.items.some(customer2 => (customer.person.idNumber === customer2.person.idNumber));
  }

  protected getIndexOfItem(customer: Partial<Customer>) {
    return this.items.findIndex(customer2 => (customer.person.idNumber === customer2.person.idNumber));
  }
}
