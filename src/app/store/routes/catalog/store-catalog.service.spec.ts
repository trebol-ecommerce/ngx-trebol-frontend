// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreCatalogService } from './store-catalog.service';
import { StoreApiIService } from 'src/app/api/store-api.iservice';
import { of, EMPTY } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;
  let mockApiService: Partial<StoreApiIService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(() => {
    mockApiService = {
      fetchProductById() { return EMPTY; },
      fetchFilteredProductCollection() { return of([]); },
      fetchStoreFrontProductCollection() { return of([]); }
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
        { provide: API_SERVICE_INJECTION_TOKENS.store, useValue: mockApiService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    });
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
