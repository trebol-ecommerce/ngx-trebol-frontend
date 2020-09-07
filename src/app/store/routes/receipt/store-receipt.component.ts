import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { StoreReceiptService } from './store-receipt.service';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent {

  protected sell$: Observable<Sell>;

  public loading$: Observable<boolean>;
  public details$: Observable<SellDetail[]>;
  public soldOn$: Observable<string>;

  constructor(
    protected service: StoreReceiptService,
    protected route: ActivatedRoute
  ) {
    this.sell$ = this.service.sell$.pipe();
    this.loading$ = this.service.loading$.pipe();
    this.details$ = this.service.details$.pipe();
    this.soldOn$ = this.service.soldOn$.pipe();

    this.loadSell();
  }

  private loadSell() {
    console.log(this.route.snapshot);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.fetchSell(id);
  }
}
