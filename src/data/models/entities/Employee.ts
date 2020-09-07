import { Person } from './Person';
import { AbstractEntity } from '../AbstractEntity';
import { EmployeeRole } from './EmployeeRole';

export class Employee
  implements AbstractEntity {

  public id: number;
  public role: Partial<EmployeeRole>;

  public person?: Person;
}
