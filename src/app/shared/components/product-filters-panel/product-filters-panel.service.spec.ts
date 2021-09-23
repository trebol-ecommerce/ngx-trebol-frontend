/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { ProductFiltersPanelService } from './product-filters-panel.service';

describe('ProductFiltersPanelService', () => {
  let service: Partial<ProductFiltersPanelService>;

  beforeEach(() => {
    service = {

    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductFiltersPanelService, useValue: service }
      ]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
