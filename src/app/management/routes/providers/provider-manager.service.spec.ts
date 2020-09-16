import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProviderManagerService } from './provider-manager.service';

describe('ProviderManagerService', () => {
  let service: ProviderManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ProviderManagerService
      ]
    });
    service = TestBed.inject(ProviderManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
