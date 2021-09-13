// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/entities/Customer';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_CUSTOMERS } from '../mock/mock-customers.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class CustomersDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Customer> {

  protected items: Customer[] = MOCK_CUSTOMERS.map(n => Object.assign(new Customer(), n));

  constructor() {
    super();
  }

  protected itemExists(customer: Partial<Customer>) {
    return this.items.some(customer2 => (customer.person.idCard === customer2.person.idCard));
  }

  protected getIndexOfItem(customer: Partial<Customer>) {
    return this.items.findIndex(customer2 => (customer.person.idCard === customer2.person.idCard));
  }
}
