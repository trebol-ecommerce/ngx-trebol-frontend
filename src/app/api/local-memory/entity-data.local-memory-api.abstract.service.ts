/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { of } from 'rxjs';
import { compareObjectsForSort } from 'src/functions/compareObjectsForSort';
import { DataPage } from 'src/models/DataPage';
import { IEntityDataApiService } from '../entity.data-api.iservice';
import {
  matchesDateProperty, matchesIdProperty, matchesNumberProperty, matchesStringProperty
} from './entity-data.local-memory-api.functions';

/**
 * Base class for a service that can fetch data from the local (client) memory.
 */
export abstract class EntityDataLocalMemoryApiService<T>
  implements IEntityDataApiService<T> {

  protected abstract items: T[];
  protected abstract itemExists(itemLike: Partial<T>): boolean;
  protected abstract getIndexOfItem(itemLike: Partial<T>): number;

  fetchPage(pageIndex = 0, pageSize = 10, sortBy?: string, order?: string, filters?: any) {

    const filteredItems = !!filters ? this.filterItems(filters) : this.items.slice();
    const totalCount = filteredItems.length;

    const sortedItems = (!!sortBy) ?
      filteredItems.sort((a, b) => this.sortItems(a, b, sortBy, order)) :
      filteredItems;

    const firstIndex = (pageIndex * pageSize);
    const lastIndex = firstIndex + pageSize;
    const items = sortedItems.slice(firstIndex, lastIndex);

    return of<DataPage<T>>({
      items,
      totalCount,
      pageIndex,
      pageSize
    });
  }

  /**
   * Iterates each key-value property pair in the provided object,
   * filters all items matching the same properties.
   */
  protected filterItems(filter: any): T[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName) && propName !== 'id') {
        const propValue = filter[propName];
        if (typeof propValue === 'string') {
          matchingItems = matchingItems.filter(it => matchesStringProperty(it, propName, propValue));
        } else if (typeof propValue === 'number') {
          matchingItems = matchingItems.filter(it => matchesNumberProperty(it, propName, propValue));
        } else if (typeof propValue === 'object') {
          if (propValue instanceof Date) {
            matchingItems = matchingItems.filter(it => matchesDateProperty(it, propName, propValue));
          } else if ('id' in propValue) {
            matchingItems = matchingItems.filter(it => matchesIdProperty(it, propName, propValue));
          }
        }
      }
    }

    return matchingItems;
  }

  protected sortItems(a: T, b: T, sortBy: string, order = 'asc'): number {
    return compareObjectsForSort(a, b, sortBy, order);
  }
}
