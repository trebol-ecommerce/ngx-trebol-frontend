import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { SellManagerFormService } from './sell-manager-form.service';

describe('SellManagerFormService', () => {
  let service: SellManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SellManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(SellManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
