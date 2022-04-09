/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataManagerServiceDirective } from './data-manager.service.directive';

const MOCK_DATA_SERVICE_TOKEN = new InjectionToken('dataServiceToken');

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
  let dataServiceSpy: jasmine.SpyObj<IEntityDataApiService<any>>;

  beforeEach(() => {
    const mockDataService = jasmine.createSpyObj('IEntityDataApiService<any>', ['fetchPage']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MOCK_DATA_SERVICE_TOKEN, useValue: mockDataService },
        MockDataManagerService
      ]
    });
    dataServiceSpy = TestBed.inject(MOCK_DATA_SERVICE_TOKEN) as jasmine.SpyObj<IEntityDataApiService<any>>;
    service = TestBed.inject(MockDataManagerService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should forward a data load call to the external API ', () => {
    dataServiceSpy.fetchPage.and.returnValue(of({
      items: [],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 0
    }));
    service.reloadItems();
    expect(dataServiceSpy.fetchPage).toHaveBeenCalled();
  });
});
