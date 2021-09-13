// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreCatalogService } from './store-catalog.service';
import { IStoreApiService } from 'src/app/api/store-api.iservice';
import { of, EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;
  let mockStoreApiService: Partial<IStoreApiService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(() => {
    mockStoreApiService = {
      fetchProductByBarcode() { return EMPTY; },
      fetchFilteredProductCollection() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      },
      fetchStoreFrontProductCollection() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
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
        { provide: API_SERVICE_INJECTION_TOKENS.products, useValue: mockStoreApiService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    });
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
