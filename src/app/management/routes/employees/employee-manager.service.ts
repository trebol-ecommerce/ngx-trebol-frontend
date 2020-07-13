import { Inject, Injectable } from '@angular/core';
import { Employee } from 'src/data/models/entities/Employee';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class EmployeeManagerService
  extends DataManagerAbstractService<Employee> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.employees) protected dataService: EntityDataIService<Employee>
  ) {
    super();
  }
}
