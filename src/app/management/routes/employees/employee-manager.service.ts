import { Inject, Injectable } from '@angular/core';
import { Employee } from 'src/data/models/entities/Employee';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerService } from '../../data-manager.aservice';

@Injectable()
export class EmployeeManagerService
  extends DataManagerService<Employee> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityDataIService<Employee>
  ) {
    super();
  }
}
