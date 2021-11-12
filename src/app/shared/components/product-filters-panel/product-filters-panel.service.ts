/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductCategoriesDataApiService } from 'src/app/api/product-categories.data-api.iservice';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private apiService: IProductCategoriesDataApiService,
  ) { }

  getRootProductCategories(): Observable<ProductCategory[]> {
    return this.apiService.readAllProductCategories();
  }

  getChildrenProductCategoryByParentCode(code: number): Observable<ProductCategory[]> {
    return this.apiService.readAllProductCategoriesByParentCode(code);
  }

}
