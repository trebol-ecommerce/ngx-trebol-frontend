import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';

export class Client
  implements AbstractEntity {

  public id: number;
  public person?: Person;
}
