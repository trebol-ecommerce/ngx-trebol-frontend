import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ClientManagerService } from './client-manager.service';

describe('ClientManagerService', () => {
  let service: ClientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        ClientManagerService
      ]
    });
    service = TestBed.inject(ClientManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
