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
import { Shipper } from 'src/models/entities/Shipper';
import { ManagementProductListsService } from './management-product-lists.service';

describe('ManagementProductListsService', () => {
  let service: ManagementProductListsService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Shipper>>;

  beforeEach(() => {
    mockApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      },
      delete() { return of(void 0); }
    };

    TestBed.configureTestingModule({
      providers: [
        ManagementProductListsService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductLists, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementProductListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
