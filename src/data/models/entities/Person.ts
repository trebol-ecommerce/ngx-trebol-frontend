import { AbstractEntity } from '../AbstractEntity';

/**
 *
 */
export class Person
  implements AbstractEntity {

  public id: number;
  public name: string;
  public idCard: string;
  public address: string;
  public email: string;
  public phone1?: number;
  public phone2?: number;
}
