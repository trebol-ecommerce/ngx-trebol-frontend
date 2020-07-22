import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, mapTo, startWith, tap } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit {

  protected externalDataSource: Subject<Sell> = new BehaviorSubject(null);

  public loading$: Observable<boolean>;
  public details$: Observable<SellDetail[]>;
  public soldOn$: Observable<string>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected sellDataService: CompositeEntityDataIService<Sell, SellDetail>,
    protected route: ActivatedRoute,
  ) {
    this.loading$ = this.externalDataSource.asObservable().pipe(map(s => !s));
    this.details$ = this.externalDataSource.asObservable().pipe(map(s => s.details));
    this.soldOn$ = this.externalDataSource.asObservable().pipe(map(s => s.soldOn));
  }

  protected fetchSell(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sellDataService.readById(id).subscribe(
      sell => {
        this.externalDataSource.next(sell);
      }
    );
  }

  ngOnInit(): void {
    this.fetchSell();
  }

}
