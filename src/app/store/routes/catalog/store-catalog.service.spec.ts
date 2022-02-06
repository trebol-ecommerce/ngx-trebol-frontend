/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { Product } from 'src/models/entities/Product';
import { StoreCatalogService } from './store-catalog.service';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;
  let mockProductListsApiService: Partial<ITransactionalProductListContentsDataApiService>;
  let mockProductsApiService: Partial<ITransactionalEntityDataApiService<Product>>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(() => {
    mockProductListsApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };
    mockProductsApiService = {
      fetchExisting() {
        return throwError({ status: 404 });
      }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        StoreCatalogService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductLists, useValue: mockProductListsApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.dataProducts, useValue: mockProductsApiService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    });
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
