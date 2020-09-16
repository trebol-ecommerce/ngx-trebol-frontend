import { Inject, Injectable } from '@angular/core';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/app/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityDataIService } from 'src/app/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class PurchaseOrderManagerService
  extends DataManagerService<PurchaseOrder> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected dataService: CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail>
  ) {
    super();
  }
}
