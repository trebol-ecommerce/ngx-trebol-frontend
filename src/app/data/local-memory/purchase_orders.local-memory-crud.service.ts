import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/app/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityCrudIService } from '../composite-entity.crud.iservice';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_PURCHASE_ORDERS: Partial<PurchaseOrder>[] = [
  {
    id: 1,
    orderedOn: '2020-06-16',
    receivedOn: '2020-06-16',
    employee: { id: 1, role: { id: 1 } },
    provider: { id: 1 },
    details: [
      { id: 1, product: { id: 2 }, units: 3 }
    ]
  }
];

@Injectable()
export class PurchaseOrdersLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<PurchaseOrder>
  implements CompositeEntityCrudIService<PurchaseOrder, PurchaseOrderDetail> {

  protected items: PurchaseOrder[] = MOCK_PURCHASE_ORDERS.map(n => Object.assign(new PurchaseOrder(), n));

  constructor() {
    super();
  }

  public readDetailsById(id: number): Observable<PurchaseOrderDetail[]> {
    return this.readById(id).pipe(map(p => p.details));
  }
}
