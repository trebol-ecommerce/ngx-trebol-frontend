/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementProductCategoriesService } from './management-product-categories.service';

describe('ManagementProductCategoriesService', () => {
  let service: ManagementProductCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementProductCategoriesService
      ]
    });
    service = TestBed.inject(ManagementProductCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
