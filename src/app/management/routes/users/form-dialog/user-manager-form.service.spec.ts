import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { UserManagerFormService } from './user-manager-form.service';

describe('UserManagerFormService', () => {
  let service: UserManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(UserManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
