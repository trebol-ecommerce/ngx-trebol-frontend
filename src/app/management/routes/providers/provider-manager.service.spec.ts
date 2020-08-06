import { TestBed } from '@angular/core/testing';

import { ProviderManagerService } from './provider-manager.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('ProviderManagerService', () => {
  let service: ProviderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProviderManagerService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(ProviderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
