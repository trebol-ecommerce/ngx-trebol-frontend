// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/app/models/DataPage';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { API_SERVICE_INJECTION_TOKENS } from '../../api-service-injection-tokens';
import { ICategoriesPublicApiService } from '../../categories-public-api.iservice';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';

@Injectable()
export class CategoriesPublicLocalMemoryApiService
  implements ICategoriesPublicApiService {

  protected items: ProductCategory[] = [];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private dataService: EntityDataLocalMemoryApiService<ProductCategory>
  ) {
    this.dataService.fetchPage().subscribe(response => {
      this.items = response.items;
    });
  }

  public fetchChildrenProductCategoriesByParentCode(parentCode: string): Observable<DataPage<ProductCategory>> {
    return of(MOCK_PRODUCT_CATEGORIES.filter(t => t.parent.code === parentCode)).pipe(
      map(items => ({
        totalCount: items.length,
        items,
        pageSize: items.length,
        pageIndex: 0
      }))
    );
  }

  public fetchRootProductCategories(): Observable<DataPage<ProductCategory>> {
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
