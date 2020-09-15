import { Inject, Injectable } from '@angular/core';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Employee } from 'src/data/models/entities/Employee';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { Observable } from 'rxjs';
import { EmployeeRole } from 'src/data/models/entities/EmployeeRole';

@Injectable()
export class EmployeeManagerFormService
  extends DataManagerFormService<Employee> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityDataIService<Employee>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
  ) {
    super();
  }

  public getAllEmployeeRoles(): Observable<EmployeeRole[]> {
    return this.sharedDataService.readAllEmployeeRoles();
  }

}
