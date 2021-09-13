// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
