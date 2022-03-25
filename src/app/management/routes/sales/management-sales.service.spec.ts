/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { Sell } from 'src/models/entities/Sell';
import { ManagementSalesService } from './management-sales.service';

describe('ManagementSalesService', () => {
  let service: ManagementSalesService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Sell>>;
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
        ManagementSalesService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataSales, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
