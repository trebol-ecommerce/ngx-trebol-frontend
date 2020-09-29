import { AbstractEntity } from '../AbstractEntity';
import { Person } from './Person';

export class Seller
  implements AbstractEntity {

  public id: number;
  public person?: Person;
}
