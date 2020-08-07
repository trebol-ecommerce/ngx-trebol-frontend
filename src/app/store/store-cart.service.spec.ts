import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { StoreCartService } from './store-cart.service';

describe('StoreCartService', () => {
  let service: StoreCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreCartService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(StoreCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
