import { Inject, Injectable } from '@angular/core';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class PurchaseOrderManagerService
  extends DataManagerAbstractService<PurchaseOrder> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected dataService: CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail>
  ) {
    super();
  }
}
