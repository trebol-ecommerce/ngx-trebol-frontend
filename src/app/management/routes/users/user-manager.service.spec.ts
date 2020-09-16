import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/app/data/services/local-memory/local-memory-data.module';
import { UserManagerService } from './user-manager.service';

describe('UserManagerService', () => {
  let service: UserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(UserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
