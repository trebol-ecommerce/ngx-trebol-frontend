import { AbstractEntity } from '../AbstractEntity';
import { User } from './User';

export class Session
  extends AbstractEntity {

  public id: number;
  public openedOn: string;
  public hash: string;
  public user: Partial<User>;
}
