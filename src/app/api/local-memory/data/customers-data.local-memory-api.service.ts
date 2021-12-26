/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { compareObjectsForSort } from 'src/functions/compareObjectsForSort';
import { Customer } from 'src/models/entities/Customer';
import { matchesStringProperty, matchesNumberProperty } from '../entity-data.local-memory-api.functions';
import { MOCK_CUSTOMERS } from '../mock/mock-customers.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class CustomersDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Customer> {

  protected items = MOCK_CUSTOMERS.slice();

  constructor() {
    super();
  }

  /**
   * Iterates each key-value property pair in the provided object,
   * filters all items matching the same properties.
   */
  protected filterItems(filter: any): Customer[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName) && propName !== 'id') {
        const propValue = filter[propName];
        if (typeof propValue === 'string') {
          matchingItems = matchingItems.filter(it => matchesStringProperty(it.person, propName, propValue));
        } else if (typeof propValue === 'number') {
          matchingItems = matchingItems.filter(it => matchesNumberProperty(it.person, propName, propValue));
        }
      }
    }

    return matchingItems;
  }

  protected sortItems(a: Customer, b: Customer, sortBy: string, order = 'asc'): number {
    const objectSortProperty =
      (sortBy === 'name') ? 'lastName' :
      sortBy;
    return compareObjectsForSort(a.person, b.person, objectSortProperty, order);
  }

  protected itemExists(customer: Partial<Customer>) {
    return this.items.some(customer2 => (customer.person.idNumber === customer2.person.idNumber));
  }

  protected getIndexOfItem(customer: Partial<Customer>) {
    return this.items.findIndex(customer2 => (customer.person.idNumber === customer2.person.idNumber));
  }
}
