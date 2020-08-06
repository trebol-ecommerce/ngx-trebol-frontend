import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';

@Injectable()
export class StoreReceiptService {

  protected sellSource: Subject<Sell> = new BehaviorSubject(null);

  public sell$: Observable<Sell> = this.sellSource.asObservable();

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected sellDataService: CompositeEntityDataIService<Sell, SellDetail>,
  ) { }

  public fetchSell(id: number): void {
    this.sellDataService.readById(id).subscribe(
      sell => {
        this.sellSource.next(sell);
      }
    );
  }
}
