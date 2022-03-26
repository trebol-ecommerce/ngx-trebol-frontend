/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Product } from 'src/models/entities/Product';
import { matchesDateProperty, matchesIdProperty, matchesNumberProperty, matchesStringProperty } from '../entity-data.local-memory-api.functions';
import { MOCK_PRODUCTS } from '../mock/mock-products.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductsDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Product> {

  protected items = MOCK_PRODUCTS.slice();

  constructor() {
    super();
  }

  protected filterItems(filter: any): Product[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName)) {
        const propValue = filter[propName];
        if (propName === 'categoryCode') {
          if (!!propValue) {
            matchingItems = matchingItems.filter(p => (p.category?.code === propValue));
          } else {
            matchingItems = matchingItems.filter(p => !p.category);
          }
        } else if (!!propValue) {
          if (propName === 'nameLike') {
            const nameRegexp = new RegExp(`^.*${propValue}.*$`);
            matchingItems = matchingItems.filter(c => nameRegexp.test(c.name));
          } else if (!!propValue && propName !== 'id') {
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
    }

    return matchingItems;
  }

  protected itemExists(product: Partial<Product>) {
    return this.items.some(product2 => (product.barcode === product2.barcode));
  }

  protected getIndexOfItem(product: Partial<Product>) {
    return this.items.findIndex(product2 => (product.barcode === product2.barcode));
  }
}
