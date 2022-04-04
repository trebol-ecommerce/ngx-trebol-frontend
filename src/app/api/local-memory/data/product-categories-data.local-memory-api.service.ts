/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { matchesDateProperty, matchesIdProperty, matchesNumberProperty, matchesStringProperty } from '../entity-data.local-memory-api.functions';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductCategoriesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<ProductCategory> {

  protected items = MOCK_PRODUCT_CATEGORIES.slice();

  constructor() {
    super();
  }

  fetchPage(pageIndex = 0, pageSize = 10, sortBy?: string, order?: string, filters?: any) {
    const theseFilters = (!filters || JSON.stringify(filters) === '{}') ? { parentCode: null } : filters;
    return super.fetchPage(pageIndex, pageSize, sortBy, order, theseFilters);
  }

  create(item: ProductCategory) {
    return this.itemExists(item) ?
      throwError({ status: 400 }) :
      (
        (item.parent?.code) ?
        this.fetchExisting({ code: item.parent.code }).pipe(
          tap(parent => (item.parent = parent))
        ) :
        of()
      ).pipe(
        map(() => void 0),
        tap(() => this.items.push(item))
      );
  }

  protected itemExists(category: Partial<ProductCategory>): boolean {
    return this.items.some(category2 => (category.code === category2.code));
  }

  protected getIndexOfItem(category: Partial<ProductCategory>): number {
    return this.items.findIndex(category2 => (category.code === category2.code));
  }

  protected filterItems(filter: any): ProductCategory[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName)) {
        const propValue = filter[propName];
        if (propName === 'parentCode') {
          if (propValue === null) {
            matchingItems = matchingItems.filter(c => (!c.parent));
          } else {
            matchingItems = matchingItems.filter(c => (c.parent?.code === propValue));
          }
        } else if (propName === 'nameLike') {
          const nameRegexp = new RegExp(`^.+${propValue}.+$`);
          matchingItems = matchingItems.filter(c => nameRegexp.test(c.name));
        } else if (propName !== 'id') {
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
    }

    return matchingItems;
  }
}
