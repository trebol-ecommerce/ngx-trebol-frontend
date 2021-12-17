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
import { Sell } from 'src/models/entities/Sell';
import { ManagementSalesService } from './management-sales.service';

describe('ManagementSalesService', () => {
  let service: ManagementSalesService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Sell>>;

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
        ManagementSalesService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataSales, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});