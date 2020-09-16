import { TestBed } from '@angular/core/testing';
import { LocalMemoryAuthModule } from 'src/app/auth/local-memory/local-memory-auth.module';
import { LocalMemoryDataModule } from 'src/data/services/local-memory/local-memory-data.module';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LocalMemoryDataModule,
        LocalMemoryAuthModule
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
