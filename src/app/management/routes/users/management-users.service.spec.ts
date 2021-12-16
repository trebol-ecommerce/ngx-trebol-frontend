/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ManagementUsersService } from './management-users.service';

describe('ManagementUsersService', () => {
  let service: ManagementUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ManagementUsersService
      ]
    });
    service = TestBed.inject(ManagementUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
