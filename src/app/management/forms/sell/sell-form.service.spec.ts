/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Product } from 'src/models/entities/Product';
import { Sell } from 'src/models/entities/Sell';
import { SellDetail } from 'src/models/entities/SellDetail';
import { SellFormService } from './sell-form.service';

describe('SellManagerFormService', () => {
  let service: SellFormService;
  let mockSalesApiService: Partial<ICompositeEntityDataApiService<Sell, SellDetail>>;
  let mockProductsApiService: Partial<ITransactionalEntityDataApiService<Product>>;

  beforeEach(() => {
    mockSalesApiService = {
      fetchInnerDataFrom() { return EMPTY; }
    };
    mockProductsApiService = {
      fetchExisting() { return of(new Product()); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: API_INJECTION_TOKENS.dataSales, useValue: mockSalesApiService },
        { provide: API_INJECTION_TOKENS.dataProducts, useValue: mockProductsApiService }
      ]
    });
    service = TestBed.inject(SellFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
