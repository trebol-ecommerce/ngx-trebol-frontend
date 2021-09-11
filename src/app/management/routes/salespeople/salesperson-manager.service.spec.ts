// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/local-memory-data-api.module';
import { SalespersonManagerService } from './salesperson-manager.service';

describe('SalespersonManagerService', () => {
  let service: SalespersonManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SalespersonManagerService
      ]
    });
    service = TestBed.inject(SalespersonManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
