import { TestBed } from '@angular/core/testing';

import { ManagementService } from './management.service';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';

describe('ManagementService', () => {
  let service: ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ManagementService, ...LOCAL_MEMORY_DATA_PROVIDERS ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
