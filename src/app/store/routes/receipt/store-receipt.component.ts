import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { StoreReceiptService } from './store-receipt.service';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit {

  protected sell$: Observable<Sell>;

  public loading$: Observable<boolean>;
  public details$: Observable<SellDetail[]>;
  public soldOn$: Observable<string>;

  constructor(
    protected service: StoreReceiptService,
    protected route: ActivatedRoute,
  ) {
    this.sell$ = this.service.sell$.pipe();
    this.loading$ = this.sell$.pipe(map(s => !s));
    this.details$ = this.sell$.pipe(map(s => s.details));
    this.soldOn$ = this.sell$.pipe(map(s => s.soldOn));
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.fetchSell(id);
  }

}
