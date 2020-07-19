import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit {

  protected loadingSource: Subject<boolean> = new BehaviorSubject(true);

  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  public sell: Sell;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected sellDataService: CompositeEntityDataIService<Sell, SellDetail>,
    protected route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.fetchSell();
  }

  protected fetchSell(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sellDataService.readById(id).subscribe(
      pOrder => {
        this.sell = pOrder;
        this.loadingSource.next(false);
      }
    );
  }

}
