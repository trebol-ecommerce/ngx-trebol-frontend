import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { EmployeeManagerService } from './employee-manager.service';

describe('EmployeeManagerService', () => {
  let service: EmployeeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeManagerService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(EmployeeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
