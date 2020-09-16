import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';
import { Employee } from './Employee';
import { Login } from '../Login';

export class User
  implements AbstractEntity, Partial<Login> {

  public id: number;
  public name: string;
  public createdOn?: string;
  public password?: string;

  public person: Partial<Person>;
  public employee?: Employee;
  public clientId?: number;
}
