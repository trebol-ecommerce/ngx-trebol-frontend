import { Injectable } from '@angular/core';
import { Employee } from 'src/app/data/models/entities/Employee';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_EMPLOYEES: Partial<Employee>[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Ejemplo 275',
      email: 'example@domain.com'
    }
  }
];

@Injectable()
export class EmployeesLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<Employee> {

  protected items: Employee[] = MOCK_EMPLOYEES.map(n => Object.assign(new Employee(), n));

  constructor() {
    super();
  }
}
