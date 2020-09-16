import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/services/local-memory/local-memory-data.module';
import { PurchaseOrderManagerService } from './purchase-order-manager.service';

describe('PurchaseOrderManagerService', () => {
  let service: PurchaseOrderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseOrderManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(PurchaseOrderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
