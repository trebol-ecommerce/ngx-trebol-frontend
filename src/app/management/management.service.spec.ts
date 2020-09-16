import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalMemoryAuthModule } from 'src/app/auth/local-memory/local-memory-auth.module';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { ManagementService } from './management.service';

describe('ManagementService', () => {
  let service: ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LocalMemoryDataModule,
        LocalMemoryAuthModule
      ],
      providers: [
        ManagementService
      ]
    });
    service = TestBed.inject(ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
