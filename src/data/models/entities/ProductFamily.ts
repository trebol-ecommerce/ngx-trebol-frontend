import { AbstractEntity } from '../AbstractEntity';
import { Provider } from './Provider';

export class ProductFamily
  extends AbstractEntity {

  public id: number;
  public name: string;

  public provider?: Provider;
}
