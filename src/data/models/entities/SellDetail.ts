import { AbstractEntity } from '../AbstractEntity';
import { Product } from './Product';

export class SellDetail
  extends AbstractEntity {

  public id: number;
  public product: Product;
  public units: number;
  public sellId?: number;
}
