import { TestBed } from '@angular/core/testing';

import { StoreCustomerLoginWatchService } from './store-customer-login-watch.service';

describe('StoreCustomerLoginWatchService', () => {
  let service: StoreCustomerLoginWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCustomerLoginWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
