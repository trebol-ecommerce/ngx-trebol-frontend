import { AbstractEntity } from '../AbstractEntity';
import { ProductFamily } from './ProductFamily';

export class ProductType
  extends AbstractEntity {

  public id: number;
  public name: string;

  public productFamily?: Partial<ProductFamily>;
}
