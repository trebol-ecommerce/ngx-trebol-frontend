import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/services/local-memory/local-memory-data.module';
import { ProductManagerFormService } from './product-manager-form.service';

describe('ProductManagerFormService', () => {
  let service: ProductManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(ProductManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
