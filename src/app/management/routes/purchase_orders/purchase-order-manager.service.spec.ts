import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { PurchaseOrderManagerService } from './purchase-order-manager.service';

describe('PurchaseOrderManagerService', () => {
  let service: PurchaseOrderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        PurchaseOrderManagerService
      ]
    });
    service = TestBed.inject(PurchaseOrderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
