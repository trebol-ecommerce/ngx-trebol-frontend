import { Inject, Injectable } from '@angular/core';
import { Employee } from 'src/app/data/models/entities/Employee';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class EmployeeManagerService
  extends DataManagerService<Employee> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityCrudIService<Employee>
  ) {
    super();
  }
}
