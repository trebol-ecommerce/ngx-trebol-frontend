/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/app/models/DataPage';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { ICategoriesPublicApiService } from '../../categories-public-api.iservice';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';

// TODO uncomment when data api for product categories is created

@Injectable()
export class CategoriesPublicLocalMemoryApiService
  implements ICategoriesPublicApiService {

  // protected items: ProductCategory[] = [];

  constructor(
    // @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private dataService: EntityDataLocalMemoryApiService<ProductCategory>
  ) {
    // this.dataService.fetchPage().subscribe(response => {
    //   this.items = response.items;
    // });
  }

  fetchChildrenProductCategoriesByParentCode(parentCode: number): Observable<DataPage<ProductCategory>> {
    return of(MOCK_PRODUCT_CATEGORIES.filter(t => t.parent.code === parentCode)).pipe(
      map(items => ({
        totalCount: items.length,
        items,
        pageSize: items.length,
        pageIndex: 0
      }))
    );
  }

  fetchRootProductCategories(): Observable<DataPage<ProductCategory>> {
    return of(MOCK_PRODUCT_CATEGORIES).pipe(
      map(items => ({
        totalCount: items.length,
        items,
        pageSize: items.length,
        pageIndex: 0
      }))
    );
  }
}
