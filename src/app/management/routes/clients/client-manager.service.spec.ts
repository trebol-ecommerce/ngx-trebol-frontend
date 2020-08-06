import { TestBed } from '@angular/core/testing';

import { ClientManagerService } from './client-manager.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('ClientManagerService', () => {
  let service: ClientManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ClientManagerService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(ClientManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
