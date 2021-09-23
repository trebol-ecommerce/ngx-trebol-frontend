/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) private apiService: ICategoriesPublicApiService,
  ) { }

  getRootProductCategories(): Observable<ProductCategory[]> {
    return this.apiService.fetchRootProductCategories().pipe(
      map(page => page.items)
    );
  }

  getChildrenProductCategoryByParentCode(code: number): Observable<ProductCategory[]> {
    return this.apiService.fetchChildrenProductCategoriesByParentCode(code).pipe(
      map(page => page.items)
    );
  }

}
