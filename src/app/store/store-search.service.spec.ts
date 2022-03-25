/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/models/entities/Product';
import { API_SERVICE_INJECTION_TOKENS } from '../api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from '../api/transactional-entity.data-api.iservice';
import { StoreSearchService } from './store-search.service';

describe('StoreSearchService', () => {
  let service: StoreSearchService;
  let mockCheckoutApiService: Partial<ITransactionalEntityDataApiService<Product>>;

  beforeEach(() => {
    mockCheckoutApiService = {
      fetchPage() {
        return of({
          items: [],
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
      }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        StoreSearchService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataProducts, useValue: mockCheckoutApiService }
      ]
    });
    service = TestBed.inject(StoreSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
