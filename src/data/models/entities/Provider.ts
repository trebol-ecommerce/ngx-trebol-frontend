import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';

export class Provider
  implements AbstractEntity {

  public id: number;
  public businessCard: string;

  public person?: Person;
}
