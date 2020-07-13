import { TestBed } from '@angular/core/testing';

import { PurchaseOrderManagerService } from './purchase-order-manager.service';

describe('PurchaseOrderManagerService', () => {
  let service: PurchaseOrderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
