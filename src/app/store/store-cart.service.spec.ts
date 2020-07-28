import { TestBed } from '@angular/core/testing';

import { StoreCartService } from './store-cart.service';

describe('StoreCartService', () => {
  let service: StoreCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
