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
import { Image } from 'src/models/entities/Image';
import { ManagementImagesService } from './management-images.service';

describe('ManagementImagesService', () => {
  let service: ManagementImagesService;
  let mockApiService: Partial<ITransactionalEntityDataApiService<Image>>;
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
        ManagementImagesService,
        { provide: API_INJECTION_TOKENS.dataImages, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(ManagementImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
