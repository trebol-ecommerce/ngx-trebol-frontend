import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProviderManagerFormService } from './provider-manager-form.service';

describe('ProviderManagerFormService', () => {
  let service: ProviderManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ProviderManagerFormService
      ]
    });
    service = TestBed.inject(ProviderManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
