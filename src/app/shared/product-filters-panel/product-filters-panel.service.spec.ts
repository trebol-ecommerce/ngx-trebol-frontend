// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductFiltersPanelService } from './product-filters-panel.service';
import { StoreCatalogDataIService } from 'src/app/api/data-mgt/store.catalog.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/api/data-mgt/data-injection-tokens';

describe('ProductFiltersPanelService', () => {
  let service: Partial<ProductFiltersPanelService>;
  let catalogService: Partial<StoreCatalogDataIService>;

  beforeEach(() => {
    catalogService = {
      readProductFamilies() { return of([]); },
      readProductTypesByFamilyId(id) { return of([]); }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: DATA_INJECTION_TOKENS.storeCatalog, useValue: catalogService }
      ]
    });
    service = TestBed.inject(ProductFiltersPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
