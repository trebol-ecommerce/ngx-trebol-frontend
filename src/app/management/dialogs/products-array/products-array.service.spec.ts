// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ProductsArrayService } from './products-array.service';

describe('ProductsArrayService', () => {
  let service: ProductsArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ProductsArrayService
      ]
    });
    service = TestBed.inject(ProductsArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
