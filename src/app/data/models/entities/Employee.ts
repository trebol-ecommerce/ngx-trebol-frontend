import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';

export class Employee
  implements AbstractEntity {

  public id: number;
  public person?: Person;
}
