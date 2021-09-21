/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { MOCK_SALESPEOPLE } from '../mock/mock-salespeople.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class SalespeopleDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Salesperson> {

  protected items: Salesperson[] = MOCK_SALESPEOPLE.map(n => Object.assign(new Salesperson(), n));

  constructor() {
    super();
  }

  protected itemExists(salesperson: Partial<Salesperson>) {
    return this.items.some(salesperson2 => (salesperson.person.idNumber === salesperson2.person.idNumber));
  }

  protected getIndexOfItem(customer: Partial<Salesperson>) {
    return this.items.findIndex(salesperson2 => (customer.person.idNumber === salesperson2.person.idNumber));
  }
}
