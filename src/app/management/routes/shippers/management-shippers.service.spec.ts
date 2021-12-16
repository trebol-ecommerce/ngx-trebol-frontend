/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementShippersService } from './management-shippers.service';

describe('ManagementShippersService', () => {
  let service: ManagementShippersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementShippersService
      ]
    });
    service = TestBed.inject(ManagementShippersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
