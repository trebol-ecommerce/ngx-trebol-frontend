import { TestBed } from '@angular/core/testing';

import { ProductManagerService } from './product-manager.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('ProductManagerService', () => {
  let service: ProductManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProductManagerService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(ProductManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
