import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProductManagerService } from './product-manager.service';

describe('ProductManagerService', () => {
  let service: ProductManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ProductManagerService
      ]
    });
    service = TestBed.inject(ProductManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
