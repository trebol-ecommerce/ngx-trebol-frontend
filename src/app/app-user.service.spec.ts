import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { AppUserService } from './app-user.service';

describe('AppUserService', () => {
  let service: AppUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: LOCAL_MEMORY_DATA_PROVIDERS
    });
    service = TestBed.inject(AppUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
