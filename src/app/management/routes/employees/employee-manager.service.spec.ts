import { TestBed } from '@angular/core/testing';

import { EmployeeManagerService } from './employee-manager.service';

describe('EmployeeManagerService', () => {
  let service: EmployeeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
