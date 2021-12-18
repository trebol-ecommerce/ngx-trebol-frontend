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
import { Salesperson } from 'src/models/entities/Salesperson';
import { ManagementSalespeopleService } from './management-salespeople.service';

describe('ManagementSalespeopleService', () => {
  let service: ManagementSalespeopleService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Salesperson>>;

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
        ManagementSalespeopleService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataSalespeople, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementSalespeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
