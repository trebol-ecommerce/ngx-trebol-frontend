/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Product } from 'src/models/entities/Product';
import { ProductsArrayDialogService } from './products-array-dialog.service';

describe('ProductsArrayDialogService', () => {
  let service: ProductsArrayDialogService;
  let mockApiService: Partial<IEntityDataApiService<Product>>;

  beforeEach(() => {
    mockApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };

    TestBed.configureTestingModule({
      providers: [
        ProductsArrayDialogService,
        { provide: API_INJECTION_TOKENS.dataProducts, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ProductsArrayDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
