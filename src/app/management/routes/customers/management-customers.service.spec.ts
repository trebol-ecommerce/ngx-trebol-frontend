/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementCustomersService } from './management-customers.service';

describe('ManagementCustomersService', () => {
  let service: ManagementCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementCustomersService
      ]
    });
    service = TestBed.inject(ManagementCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
