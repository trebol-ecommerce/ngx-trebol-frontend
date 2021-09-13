// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { IAboutPublicApiService } from 'src/app/api/about-public-api.iservice';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductFiltersPanelService {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) protected apiService: ICategoriesPublicApiService,
  ) { }

  public getRootProductCategories(): Observable<ProductCategory[]> {
    return this.apiService.fetchRootProductCategories().pipe(
      map(page => page.items)
    );
  }

  public getChildrenProductCategoryByParentCode(code: string): Observable<ProductCategory[]> {
    return this.apiService.fetchChildrenProductCategoriesByParentCode(code).pipe(
      map(page => page.items)
    );
  }

}
