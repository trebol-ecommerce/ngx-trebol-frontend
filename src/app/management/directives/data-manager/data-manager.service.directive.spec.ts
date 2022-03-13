/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataManagerServiceDirective } from './data-manager.service.directive';

const MOCK_DATA_SERVICE_TOKEN = 'dataServiceToken';

@Injectable()
class MockDataManagerService
  extends DataManagerServiceDirective<any> {
  constructor(
    @Inject(MOCK_DATA_SERVICE_TOKEN) protected dataService: IEntityDataApiService<any>
  ) {
    super();
  }
}

describe('DataManagerServiceDirective', () => {
  let service: MockDataManagerService;
  let mockDataService: Partial<IEntityDataApiService<any>>;

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

    TestBed.configureTestingModule({
      providers: [
        MockDataManagerService,
        { provide: MOCK_DATA_SERVICE_TOKEN, useValue: mockDataService }
      ]
    });
    service = TestBed.inject(MockDataManagerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
