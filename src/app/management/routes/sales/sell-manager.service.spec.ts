import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { SellManagerService } from './sell-manager.service';

describe('SellManagerService', () => {
  let service: SellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        SellManagerService
      ]
    });
    service = TestBed.inject(SellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
