import { TestBed } from '@angular/core/testing';
import { LOCAL_MEMORY_DATA_PROVIDERS } from 'src/data/services/local-memory/local-memory-data.module';
import { EmployeeManagerFormService } from './employee-manager-form.service';

describe('EmployeeManagerFormService', () => {
  let service: EmployeeManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeManagerFormService,
        ...LOCAL_MEMORY_DATA_PROVIDERS
      ]
    });
    service = TestBed.inject(EmployeeManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
