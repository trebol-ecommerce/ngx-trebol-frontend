import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/local-memory/local-memory-data.module';
import { SellManagerService } from './sell-manager.service';

describe('SellManagerService', () => {
  let service: SellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SellManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(SellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
