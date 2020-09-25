import { Inject, Injectable } from '@angular/core';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { Employee } from 'src/app/data/models/entities/Employee';
import { DataManagerFormService } from '../../data-manager-form.aservice';

@Injectable()
export class EmployeeManagerFormService
  extends DataManagerFormService<Employee> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityCrudIService<Employee>,
  ) {
    super();
  }

}
