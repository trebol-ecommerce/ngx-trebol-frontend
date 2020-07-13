import { TestBed } from '@angular/core/testing';

import { ProviderManagerService } from './provider-manager.service';

describe('ProviderManagerService', () => {
  let service: ProviderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
