import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ProductFiltersPanelService } from './product-filters-panel.service';

describe('ProductFiltersPanelService', () => {
  let service: ProductFiltersPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ]
    });
    service = TestBed.inject(ProductFiltersPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
