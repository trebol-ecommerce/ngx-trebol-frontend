/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagementService } from './management.service';

describe('ManagementService', () => {
  let service: ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        ManagementService
      ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
