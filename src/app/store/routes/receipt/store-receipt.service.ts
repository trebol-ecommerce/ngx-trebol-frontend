import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { Sell } from 'src/app/data/models/entities/Sell';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
import { CompositeEntityCrudIService } from 'src/app/data/composite-entity.crud.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';

@Injectable()
export class StoreReceiptService {

  protected sellSource: Subject<Sell> = new BehaviorSubject(null);

  public sell$: Observable<Sell> = this.sellSource.asObservable();
  public loading$: Observable<boolean> = this.sell$.pipe(map(v => !v), startWith(true));
  public details$: Observable<SellDetail[]> = this.sell$.pipe(pluck('details'));
  public soldOn$: Observable<string> = this.sell$.pipe(pluck('soldOn'));

  constructor(
    @Inject(DATA_INJECTION_TOKENS.salesCrud) protected sellDataService: CompositeEntityCrudIService<Sell, SellDetail>,
    protected router: Router
  ) {
  }

  public fetchSell(id: number): void {
    this.sellDataService.readById(id).subscribe(
      sell => {
        this.sellSource.next(sell);
      },
      err => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
