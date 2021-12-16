/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementSalespeopleService } from './management-salespeople.service';

describe('ManagementSalespeopleService', () => {
  let service: ManagementSalespeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementSalespeopleService
      ]
    });
    service = TestBed.inject(ManagementSalespeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
