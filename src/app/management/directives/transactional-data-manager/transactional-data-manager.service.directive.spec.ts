/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { TransactionalDataManagerServiceDirective } from './transactional-data-manager.service.directive';

const MOCK_DATA_SERVICE_TOKEN = new InjectionToken('dataServiceToken');

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
  let dataServiceSpy: jasmine.SpyObj<ITransactionalEntityDataApiService<any>>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(() => {
    const mockDataService = jasmine.createSpyObj('ITransactionalEntityDataApiService<any>', ['fetchPage', 'delete']);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MOCK_DATA_SERVICE_TOKEN, useValue: mockDataService },
        { provide: SharedDialogService, useValue: mockSharedDialogService },
        MockTransactionalDataManagerService
      ]
    });
    dataServiceSpy = TestBed.inject(MOCK_DATA_SERVICE_TOKEN) as jasmine.SpyObj<ITransactionalEntityDataApiService<any>>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    service = TestBed.inject(MockTransactionalDataManagerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should request confirmation before deleting any data', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));
    service.removeItems([{ foo: 'bar' }]).pipe(
      finalize(() => {
        expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
        expect(dataServiceSpy.delete).not.toHaveBeenCalled();
      })
    ).subscribe();
  });

  it('should forward calls to external API for deleting data', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    dataServiceSpy.delete.and.returnValue(of(void 0));
    service.removeItems([{ foo: 'bar' }]).pipe(
      finalize(() => {
        expect(dataServiceSpy.delete).toHaveBeenCalled();
        expect(dataServiceSpy.delete).toHaveBeenCalledWith({ foo: 'bar' });
      })
    ).subscribe();
  });
});
