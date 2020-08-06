import { TestBed } from '@angular/core/testing';

import { StoreCatalogService } from './store-catalog.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: LOCAL_MEMORY_DATA_PROVIDERS
    });
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
