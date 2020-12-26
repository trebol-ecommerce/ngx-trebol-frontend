// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { CustomerManagerService } from './customer-manager.service';

describe('CustomerManagerService', () => {
  let service: CustomerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        CustomerManagerService
      ]
    });
    service = TestBed.inject(CustomerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
