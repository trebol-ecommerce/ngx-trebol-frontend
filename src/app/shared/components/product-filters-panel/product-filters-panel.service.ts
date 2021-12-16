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
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private apiService: ITransactionalEntityDataApiService<ProductCategory>,
  ) { }

  getRootProductCategories(): Observable<ProductCategory[]> {
    return this.apiService.fetchPage().pipe(map(page => page.items));
  }

  getChildrenProductCategoryByParentCode(code: string): Observable<ProductCategory[]> {
    return this.apiService.fetchPageFilteredBy({ parentCode: code }).pipe(map(page => page.items));
  }

}
