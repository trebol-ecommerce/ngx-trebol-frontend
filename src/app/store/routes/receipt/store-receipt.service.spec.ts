import { TestBed } from '@angular/core/testing';

import { StoreReceiptService } from './store-receipt.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('StoreReceiptService', () => {
  let service: StoreReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ StoreReceiptService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(StoreReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
