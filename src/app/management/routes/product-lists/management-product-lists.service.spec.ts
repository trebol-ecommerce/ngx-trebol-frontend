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
import { Shipper } from 'src/models/entities/Shipper';
import { ManagementProductListsService } from './management-product-lists.service';

describe('ManagementProductListsService', () => {
  let service: ManagementProductListsService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Shipper>>;
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
        ManagementProductListsService,
        { provide: API_INJECTION_TOKENS.dataProductLists, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementProductListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
