import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/local-memory/local-memory-data.module';
import { ProviderManagerService } from './provider-manager.service';

describe('ProviderManagerService', () => {
  let service: ProviderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(ProviderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
