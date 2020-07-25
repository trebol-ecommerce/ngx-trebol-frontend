import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/data/models/entities/Product';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class StoreService
  implements OnDestroy {

  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public itemQuantity$: Observable<number>;
  public sellSubtotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected salesDataService: EntityDataIService<Sell>
  ) {
    this.itemQuantity$ = this.sellDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(p => p.units).reduce((a, b) => a + b);
        }
      )
    );

    this.sellSubtotalValue$ = this.sellDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(p => p.product.price * p.units).reduce((a, b) => a + b);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  public reset(): void {
    this.sellDetails = [];
    this.sellDetailsSource.next([]);
  }

  protected findSellDetailsIndexByProduct(p: Product): number {
    return this.sellDetails.findIndex(d => d.product.id === p.id);
  }

  public addProduct(p: Product): void {
    let indice: number = this.findSellDetailsIndexByProduct(p);

    let detalleConEsteProducto: SellDetail;
    if (indice !== -1) {
      detalleConEsteProducto = this.sellDetails[indice];
      detalleConEsteProducto.units++;
    } else {
      detalleConEsteProducto = Object.assign(new SellDetail(), { product: p, units: 1 });
      indice = this.sellDetails.push(detalleConEsteProducto);
      indice--;
    }

    this.sellDetailsSource.next(this.sellDetails);
  }

  public increaseProductUnits(i: number): void {
    if (i !== -1) {
      const detalleConEsteProducto = this.sellDetails[i];
      detalleConEsteProducto.units++;

      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public decreaseProductUnits(i: number): void {
    if (i !== -1) {
      const matchingDetail = this.sellDetails[i];
      matchingDetail.units--;

      if (matchingDetail.units > 0) {
        this.sellDetailsSource.next(this.sellDetails);
      } else {
        this.removeProduct(i);
      }

    }
  }

  public removeProduct(i: number): void {
    if (i !== -1) {
      this.sellDetails.splice(i, 1);
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public generateSell(clientId: number): Observable<Sell> {
    const venta = Object.assign(new Sell(), {
      clientId,
      detallesVenta: this.sellDetails,
      soldOn: (new Date()).toLocaleDateString()
    });
    return this.salesDataService.create(venta);
  }
}
