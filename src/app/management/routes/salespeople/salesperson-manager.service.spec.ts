/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { SalespersonManagerService } from './salesperson-manager.service';

describe('SalespersonManagerService', () => {
  let service: SalespersonManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        SalespersonManagerService
      ]
    });
    service = TestBed.inject(SalespersonManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
