/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { TransactionalDataManagerServiceDirective } from './transactional-data-manager.service.directive';

const MOCK_DATA_SERVICE_TOKEN = 'dataServiceToken';

@Injectable()
class MockTransactionalDataManagerService
  extends TransactionalDataManagerServiceDirective<any> {
  constructor(
    @Inject(MOCK_DATA_SERVICE_TOKEN) public dataService: ITransactionalEntityDataApiService<any>,
    protected sharedDialogService: SharedDialogService
  ) {
    super(sharedDialogService);
  }
}

describe('TransactionalDataManagerServiceDirective', () => {
  let service: MockTransactionalDataManagerService;
  let mockDataService: Partial<ITransactionalEntityDataApiService<any>>;
  let mockSharedDialogService: Partial<SharedDialogService>;

  beforeEach(() => {
    mockDataService = {
      fetchPage() {
        return of({
          items: [],
          pageIndex: 0,
          pageSize: 10,
          totalCount: 0
        });
      }
    };
    mockSharedDialogService = {
      requestConfirmation() { return of(false); }
    };

    TestBed.configureTestingModule({
      providers: [
        MockTransactionalDataManagerService,
        { provide: MOCK_DATA_SERVICE_TOKEN, useValue: mockDataService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    service = TestBed.inject(MockTransactionalDataManagerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
