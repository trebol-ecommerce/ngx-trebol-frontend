import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit {

  protected loadingSource: Subject<boolean> = new BehaviorSubject(true);

  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  public purchaseOrder: PurchaseOrder;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected purchaseOrderService: CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail>,
    protected route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.fetchPurchaseOrder();
  }

  protected fetchPurchaseOrder(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseOrderService.readById(id).subscribe(
      pOrder => {
        this.purchaseOrder = pOrder;
        this.loadingSource.next(false);
      }
    );
  }

}
