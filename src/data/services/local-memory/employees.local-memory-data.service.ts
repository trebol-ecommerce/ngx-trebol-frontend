import { Injectable } from '@angular/core';
import { EmployeeRolesEnum } from 'src/data/enums/EmployeeRolesEnum';
import { Employee } from 'src/data/models/entities/Employee';
import { EntityLocalMemoryDataService } from './entity.local-memory-data.aservice';

export const MOCK_EMPLOYEES: Partial<Employee>[] = [
  {
    id: 1,
    role: { id: EmployeeRolesEnum.Administrador },
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
export class EmployeesLocalMemoryDataService
  extends EntityLocalMemoryDataService<Employee> {

  protected items: Employee[] = MOCK_EMPLOYEES.map(n => Object.assign(new Employee(), n));

  constructor() {
    super();
  }
}
