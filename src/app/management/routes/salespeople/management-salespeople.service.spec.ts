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
import { Person } from 'src/models/entities/Person';
import { ManagementSalespeopleService } from './management-salespeople.service';

describe('ManagementSalespeopleService', () => {
  let service: ManagementSalespeopleService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Person>>;
  let mockSharedDialogService: Partial<SharedDialogService>;

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
      },
      delete() { return of(void 0); }
    };
    mockSharedDialogService = {
      requestConfirmation() { return of(false); }
    };

    TestBed.configureTestingModule({
      providers: [
        ManagementSalespeopleService,
        { provide: API_INJECTION_TOKENS.dataSalespeople, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementSalespeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
