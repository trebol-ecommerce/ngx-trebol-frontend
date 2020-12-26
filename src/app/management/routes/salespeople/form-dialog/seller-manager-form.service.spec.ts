// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { SalespersonManagerFormService } from './seller-manager-form.service';

describe('SellerManageSalespersonManagerFormServicerFormService', () => {
  let service: SalespersonManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SalespersonManagerFormService
      ]
    });
    service = TestBed.inject(SalespersonManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
