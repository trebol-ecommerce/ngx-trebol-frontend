import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/local-memory/local-memory-data.module';
import { ProductsArrayService } from './products-array.service';

describe('ProductsArrayService', () => {
  let service: ProductsArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsArrayService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(ProductsArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
