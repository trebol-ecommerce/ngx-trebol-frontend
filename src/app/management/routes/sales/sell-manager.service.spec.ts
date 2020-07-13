import { TestBed } from '@angular/core/testing';

import { SellManagerService } from './sell-manager.service';

describe('SellManagerService', () => {
  let service: SellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
