import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { EmployeeManagerFormService } from './employee-manager-form.service';

describe('EmployeeManagerFormService', () => {
  let service: EmployeeManagerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        EmployeeManagerFormService
      ]
    });
    service = TestBed.inject(EmployeeManagerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
