// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/app/models/entities/Product';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { Observable, of } from 'rxjs';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { MOCK_PRODUCTS } from './sources/mock-products.datasource';
import { MOCK_PRODUCT_CATEGORIES } from './sources/mock-product-categories.datasource';

@Injectable()
export class ProductsDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Product> {

  protected items: Product[] = MOCK_PRODUCTS.map(n => Object.assign(new Product(), n));

  constructor() {
    super();
  }

  public readProductTypes(): Observable<ProductCategory[]> {
    return of(MOCK_PRODUCT_CATEGORIES);
  }

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
}
