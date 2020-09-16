import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/local-memory/local-memory-data.module';
import { ProviderManagerFormService } from './provider-manager-form.service';

describe('ProviderManagerFormService', () => {
  let service: ProviderManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProviderManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(ProviderManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
