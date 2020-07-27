import { AbstractEntity } from '../AbstractEntity';
import { Product } from './Product';

export class PurchaseOrderDetail
  extends AbstractEntity {

  public id: number;
  public product: Partial<Product>;
  public units: number;
  public purchaseOrderId?: number;
}
