/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { SellManagerService } from './sell-manager.service';

describe('SellManagerService', () => {
  let service: SellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        SellManagerService
      ]
    });
    service = TestBed.inject(SellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
