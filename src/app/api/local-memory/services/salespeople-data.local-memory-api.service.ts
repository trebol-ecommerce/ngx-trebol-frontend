/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { compareObjectsForSort } from 'src/functions/compareObjectsForSort';
import { Person } from 'src/models/entities/Person';
import { matchesStringProperty, matchesNumberProperty } from '../local-memory-api.functions';
import { MOCK_SALESPEOPLE } from '../mock-data/mock-salespeople.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class SalespeopleDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Person> {

  protected items = MOCK_SALESPEOPLE.slice();

  constructor() {
    super();
  }

  /**
   * Iterates each key-value property pair in the provided object,
   * filters all items matching the same properties.
   */
  protected filterItems(filter: any): Person[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName) && propName !== 'id') {
        const propValue = filter[propName];
        if (typeof propValue === 'string') {
          matchingItems = matchingItems.filter(it => matchesStringProperty(it, propName, propValue));
        } else if (typeof propValue === 'number') {
          matchingItems = matchingItems.filter(it => matchesNumberProperty(it, propName, propValue));
        } else if (propValue === null) {
          matchingItems = matchingItems.filter(it => (it[propName] === null));
        }
      }
    }

    return matchingItems;
  }

  protected sortItems(a: Person, b: Person, sortBy: string, order = 'asc'): number {
    const objectSortProperty =
      (sortBy === 'name') ? 'lastName' :
      sortBy;
    return compareObjectsForSort(a, b, objectSortProperty, order);
  }

  protected itemExists(salesperson: Partial<Person>) {
    return this.items.some(salesperson2 => (salesperson.idNumber === salesperson2.idNumber));
  }

  protected getIndexOfItem(customer: Partial<Person>) {
    return this.items.findIndex(salesperson2 => (customer.idNumber === salesperson2.idNumber));
  }
}
