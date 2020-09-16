import { TestBed } from '@angular/core/testing';

import { ProductFiltersPanelService } from './product-filters-panel.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/services/local-memory/local-memory-data.module';

describe('ProductFiltersPanelService', () => {
  let service: ProductFiltersPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: LOCAL_MEMORY_DATA_PROVIDERS
    });
    service = TestBed.inject(ProductFiltersPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
