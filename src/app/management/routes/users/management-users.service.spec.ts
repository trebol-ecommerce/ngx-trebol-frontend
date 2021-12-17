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
import { User } from 'src/models/entities/User';
import { ManagementUsersService } from './management-users.service';

describe('ManagementUsersService', () => {
  let service: ManagementUsersService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<User>>;

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
        ManagementUsersService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataUsers, useValue: mockApiService }
      ]
    });
    service = TestBed.inject(ManagementUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
