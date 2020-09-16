import { PurchaseOrderDetail } from './PurchaseOrderDetail';
import { AbstractEntity } from '../AbstractEntity';
import { Employee } from './Employee';
import { Provider } from './Provider';
import { PurchaseOrderType } from './PurchaseOrderType';

export class PurchaseOrder
  extends AbstractEntity {

  public id: number;
  public status: string;
  public orderedOn: string;
  public receivedOn: string;
  public type: Partial<PurchaseOrderType>;
  public details: PurchaseOrderDetail[];
  public provider: Partial<Provider>;

  public employee?: Partial<Employee>;
}
