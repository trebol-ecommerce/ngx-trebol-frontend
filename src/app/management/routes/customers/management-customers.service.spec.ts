/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Customer } from 'src/models/entities/Customer';
import { ManagementCustomersService } from './management-customers.service';

describe('ManagementCustomersService', () => {
  let service: ManagementCustomersService;
  let mockApiService: Partial<IEntityDataApiService<Customer>>;

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
        ManagementCustomersService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataCustomers, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
