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
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ManagementProductCategoriesService } from './management-product-categories.service';

describe('ManagementProductCategoriesService', () => {
  let service: ManagementProductCategoriesService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<ProductCategory>>;
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
        ManagementProductCategoriesService,
        { provide: API_SERVICE_INJECTION_TOKENS.dataProductCategories, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementProductCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
