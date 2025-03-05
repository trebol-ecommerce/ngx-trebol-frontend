/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { of } from 'rxjs';
import { compareObjectsForSort } from 'src/functions/compareObjectsForSort';
import { DataPage } from 'src/models/DataPage';
import { paginateItems } from '../../../functions/paginateItems';
import { IEntityDataApiService } from '../entity.data-api.iservice';
import {
  matchesDateProperty, matchesIdProperty, matchesNumberProperty, matchesStringProperty
} from './local-memory-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

/**
 * Base class for a service that can fetch data from the local (client) memory.
 */
export abstract class EntityDataLocalMemoryApiService<T>
  implements IEntityDataApiService<T> {

  protected abstract items: T[];
  protected abstract itemExists(itemLike: Partial<T>): boolean;
  protected abstract getIndexOfItem(itemLike: Partial<T>): number;

  fetchPage(p: ApiDataPageQuerySpec) {

    const filteredItems = !!p.filters ? this.filterItems(p.filters) : this.items.slice();
    const totalCount = filteredItems.length;

    const sortedItems = (!!p.sortBy) ?
      filteredItems.sort((a, b) => this.sortItems(a, b, p.sortBy, p.order)) :
      filteredItems;

    const items = paginateItems<T>(sortedItems, p.pageIndex, p.pageSize);

    return of<DataPage<T>>({
      items,
      totalCount,
      pageIndex: p.pageIndex,
      pageSize: p.pageSize
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
        } else if (propValue === null) {
          matchingItems = matchingItems.filter(it => (it[propName] === null));
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
