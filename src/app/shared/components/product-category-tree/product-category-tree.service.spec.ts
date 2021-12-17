/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let service: ProductCategoryTreeService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<ProductCategory>>;

  beforeEach(() => {
    mockApiService = {
      create() { return of(0); },
      fetchPage() {
        return of({
          pageIndex: 0,
          items: [],
          totalCount: 0,
          pageSize: 10
        });
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ProductCategoryTreeService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService },
      ]
    });
    service = TestBed.inject(ProductCategoryTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
