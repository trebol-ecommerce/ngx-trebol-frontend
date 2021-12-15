/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductCategoriesDataApiService } from 'src/app/api/product-categories-data-api.service.interface';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let service: ProductCategoryTreeService;
  let mockCategoriesApiService: Partial<IProductCategoriesDataApiService>;

  beforeEach(() => {
    mockCategoriesApiService = {
      create() { return of(0); },
      readChildrenByParentCategoryCode() {
        return of({
          index: 0,
          items: [],
          totalCount: 0
        });
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockCategoriesApiService }
      ]
    });
    service = TestBed.inject(ProductCategoryTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
