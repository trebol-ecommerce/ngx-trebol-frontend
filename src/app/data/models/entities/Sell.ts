import { AbstractEntity } from '../AbstractEntity';
import { Client } from './Client';
import { Employee } from './Employee';
import { SellDetail } from './SellDetail';
import { SellType } from './SellType';

export class Sell
  extends AbstractEntity {

  public id: number;
  public details: SellDetail[];
  public type: Partial<SellType>;
  public soldOn: string;
  public client: Partial<Client>;

  public subtotalValue?: number;
  public employee?: Partial<Employee>;
}
