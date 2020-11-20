// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/data/local-memory/local-memory-data-api.module';
import { SellerManagerFormService } from './seller-manager-form.service';

describe('SellerManagerFormService', () => {
  let service: SellerManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SellerManagerFormService
      ]
    });
    service = TestBed.inject(SellerManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
