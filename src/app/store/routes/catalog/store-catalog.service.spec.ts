import { TestBed } from '@angular/core/testing';

import { StoreCatalogService } from './store-catalog.service';

describe('StoreCatalogService', () => {
  let service: StoreCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
