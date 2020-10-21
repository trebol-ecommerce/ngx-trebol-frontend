// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProductManagerFormService } from './product-manager-form.service';

describe('ProductManagerFormService', () => {
  let service: ProductManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ProductManagerFormService
      ]
    });
    service = TestBed.inject(ProductManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
