/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductCategoriesDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<ProductCategory> {

  protected items = MOCK_PRODUCT_CATEGORIES.slice();

  constructor() {
    super();
  }

  protected itemExists(category: Partial<ProductCategory>): boolean {
    return this.items.some(category2 => (category.code === category2.code));
  }

  protected getIndexOfItem(category: Partial<ProductCategory>): number {
    return this.items.findIndex(category2 => (category.code === category2.code));
  }
}
