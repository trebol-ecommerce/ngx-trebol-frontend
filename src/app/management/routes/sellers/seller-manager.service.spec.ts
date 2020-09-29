import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { SellerManagerService } from './seller-manager.service';

describe('SellerManagerService', () => {
  let service: SellerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SellerManagerService
      ]
    });
    service = TestBed.inject(SellerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
