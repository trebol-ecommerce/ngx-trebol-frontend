import { TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerService } from './purchase-order-manager.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('PurchaseOrderManagerService', () => {
  let service: PurchaseOrderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PurchaseOrderManagerService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(PurchaseOrderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
