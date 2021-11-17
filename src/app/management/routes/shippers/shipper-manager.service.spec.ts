/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { LocalMemoryApiModule } from 'src/app/api/local-memory/local-memory-api.module';
import { ShipperManagerService } from './shipper-manager.service';

describe('ShippersManagerService', () => {
  let service: ShipperManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryApiModule ],
      providers: [
        ShipperManagerService
      ]
    });
    service = TestBed.inject(ShipperManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
