/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductFiltersPanelService } from './product-filters-panel.service';

describe('ProductFiltersPanelService', () => {
  let service: Partial<ProductFiltersPanelService>;
  let mockApiService: Partial<ITransactionalEntityDataApiService<ProductCategory>>;

  beforeEach(() => {
    mockApiService = {
      fetchPage() { return EMPTY; },
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ProductFiltersPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
