/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { User } from 'src/models/entities/User';
import { ManagementUsersService } from './management-users.service';

describe('ManagementUsersService', () => {
  let service: ManagementUsersService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<User>>;
  let mockSharedDialogService: Partial<SharedDialogService>;

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
    mockSharedDialogService = {
      requestConfirmation() { return of(false); }
    };

    TestBed.configureTestingModule({
      providers: [
        ManagementUsersService,
        { provide: API_INJECTION_TOKENS.dataUsers, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
