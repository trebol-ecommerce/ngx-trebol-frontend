/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementSalesService } from './management-sales.service';

describe('ManagementSalesService', () => {
  let service: ManagementSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementSalesService
      ]
    });
    service = TestBed.inject(ManagementSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
