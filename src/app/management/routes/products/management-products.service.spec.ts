/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementProductsService } from './management-products.service';

describe('ManagementProductsService', () => {
  let service: ManagementProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementProductsService
      ]
    });
    service = TestBed.inject(ManagementProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
