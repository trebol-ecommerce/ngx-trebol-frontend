import { TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerFormService } from './purchase-order-manager-form.service';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';

describe('PurchaseOrderManagerFormService', () => {
  let service: PurchaseOrderManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        PurchaseOrderManagerFormService
      ]
    });
    service = TestBed.inject(PurchaseOrderManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
