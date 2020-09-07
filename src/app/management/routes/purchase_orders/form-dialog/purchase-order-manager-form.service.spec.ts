import { TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerFormService } from './purchase-order-manager-form.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('PurchaseOrderManagerFormService', () => {
  let service: PurchaseOrderManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseOrderManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(PurchaseOrderManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
