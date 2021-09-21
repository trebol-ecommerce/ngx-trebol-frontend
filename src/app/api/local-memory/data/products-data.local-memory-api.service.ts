/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { MOCK_PRODUCTS } from '../mock/mock-products.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductsDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<Product> {

  protected items: Product[] = MOCK_PRODUCTS.map(n => Object.assign(new Product(), n));

  constructor() {
    super();
  }

  // TODO update accepted query params
  protected filterItems(filter: ProductFilters): Product[] {
    let matchingItems = this.items;
    if (filter.name) {
      matchingItems = matchingItems.filter(
        it => it.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.categoryCode) {
      matchingItems = matchingItems.filter(
        it => it.category.code === filter.categoryCode
      );
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
