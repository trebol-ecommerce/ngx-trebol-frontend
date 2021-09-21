// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IProductCategoriesDataApiService } from '../../product-categories.data-api.iservice';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';

@Injectable()
export class ProductCategoriesDataLocalMemoryApiService
  implements IProductCategoriesDataApiService {

  readAllProductCategories() {
    return of(MOCK_PRODUCT_CATEGORIES);
  }

  readAllProductCategoriesByParentCode(parentCode: number) {
    return of(MOCK_PRODUCT_CATEGORIES.filter(t => t.parent.code === parentCode));
  }
}
