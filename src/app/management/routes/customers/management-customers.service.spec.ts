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
import { Person } from 'src/models/entities/Person';
import { ManagementCustomersService } from './management-customers.service';

describe('ManagementCustomersService', () => {
  let service: ManagementCustomersService;
  let mockApiService: Partial<IEntityDataApiService<Person>>;

  beforeEach(() => {
    // TODO use jasmine.SpyObj
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
        { provide: API_INJECTION_TOKENS.dataCustomers, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
