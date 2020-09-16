import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/local-memory/local-memory-data.module';
import { ClientManagerService } from './client-manager.service';

describe('ClientManagerService', () => {
  let service: ClientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(ClientManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
