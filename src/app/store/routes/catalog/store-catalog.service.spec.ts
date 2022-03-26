/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { merge, of, throwError, timer } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
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
  });

  it('should be created', () => {
    service = TestBed.inject(StoreCatalogService);
    expect(service).toBeTruthy();
  });

  it('should expose an observable with a loaded page after calling reloadItems()', () => {
    const mockDataPage: DataPage<ProductList> = {
      items: [
        {
          code: 'test',
          name: 'example list',
          totalCount: 0
        }
      ],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 1
    };
    mockProductListsApiService.fetchPage = () => of(mockDataPage);
    TestBed.overrideProvider(
      API_SERVICE_INJECTION_TOKENS.dataProductLists,
      { useValue: mockProductListsApiService }
    );
    service = TestBed.inject(StoreCatalogService);

    service.reloadItems();
    service.listsPage$.pipe(
      take(1),
      tap(nextPage => expect(nextPage).toEqual(mockDataPage))
    ).subscribe();
  });
});
