/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ProductManagerService } from './product-manager.service';

describe('ProductManagerService', () => {
  let service: ProductManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ProductManagerService
      ]
    });
    service = TestBed.inject(ProductManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
