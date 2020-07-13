import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { Observable, of } from 'rxjs';

export const MOCK_PURCHASE_ORDERS: Partial<PurchaseOrder>[] = [
  {
    id: 1,
    orderedOn: '2020-06-16',
    receivedOn: '2020-06-16',
    employee: { id: 1, role: { id: 1 } }
  }
];

@Injectable()
export class PurchaseOrdersLocalMemoryDataService
  extends EntityLocalMemoryDataService<PurchaseOrder>
  implements CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail> {

  protected items: PurchaseOrder[] = MOCK_PURCHASE_ORDERS.map(n => Object.assign(new PurchaseOrder(), n));

  constructor() {
    super();
  }

  public readDetailsById(id: number): Observable<PurchaseOrderDetail[]> {
    return of([]);
  }
}
