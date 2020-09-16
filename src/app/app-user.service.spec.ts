import { TestBed } from '@angular/core/testing';
import { LocalMemoryAuthModule } from 'src/auth/local-memory/local-memory-auth.module';
import { LocalMemoryDataModule } from 'src/data/services/local-memory/local-memory-data.module';
import { AppUserService } from './app-user.service';

describe('AppUserService', () => {
  let service: AppUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        LocalMemoryAuthModule
      ]
    });
    service = TestBed.inject(AppUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
