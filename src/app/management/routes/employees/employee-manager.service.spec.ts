import { TestBed } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/data/local-memory/local-memory-data.module';
import { EmployeeManagerService } from './employee-manager.service';

describe('EmployeeManagerService', () => {
  let service: EmployeeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LocalMemoryDataModule ],
      providers: [
        EmployeeManagerService
      ]
    });
    service = TestBed.inject(EmployeeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
