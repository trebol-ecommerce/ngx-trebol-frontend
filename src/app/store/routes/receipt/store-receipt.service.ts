import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';

@Injectable()
export class StoreReceiptService {

  protected sellSource: Subject<Sell> = new BehaviorSubject(null);

  public sell$: Observable<Sell> = this.sellSource.asObservable();
  public loading$: Observable<boolean> = this.sell$.pipe(map(v => !v), startWith(true));
  public details$: Observable<SellDetail[]> = this.sell$.pipe(pluck('details'));
  public soldOn$: Observable<string> = this.sell$.pipe(pluck('soldOn'));

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected sellDataService: CompositeEntityDataIService<Sell, SellDetail>,
    protected route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchSell(id);
  }

  protected fetchSell(id: number): void {
    this.sellDataService.readById(id).subscribe(
      sell => {
        this.sellSource.next(sell);
      }
    );
  }
}
