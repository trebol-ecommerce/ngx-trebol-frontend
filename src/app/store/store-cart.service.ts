import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/data/models/entities/Product';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class StoreCartService
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

  protected findSellDetailsIndexByProductId(id: number): number {
    return this.sellDetails.findIndex(d => d.product?.id === id);
  }

  public addProductToCart(product: Product): void {
    const index: number = this.findSellDetailsIndexByProductId(product.id);

    if (index !== -1) {
      const matchingSellDetail = this.sellDetails[index];
      matchingSellDetail.units++;
    } else {
      const newSellDetail = Object.assign<SellDetail, Partial<SellDetail>>(
        new SellDetail(),
        {
          product,
          units: 1
        }
      );
      this.sellDetails.push(newSellDetail);
    }

    this.sellDetailsSource.next(this.sellDetails);
  }

  public increaseProductUnits(index: number): void {
    if (index !== -1) {
      const detalleConEsteProducto = this.sellDetails[index];
      detalleConEsteProducto.units++;

      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public decreaseProductUnits(index: number): void {
    if (index !== -1) {
      const matchingDetail = this.sellDetails[index];
      matchingDetail.units--;

      if (matchingDetail.units > 0) {
        this.sellDetailsSource.next(this.sellDetails);
      } else {
        this.removeProductFromCart(index);
      }

    }
  }

  public removeProductFromCart(i: number): void {
    if (i !== -1) {
      this.sellDetails.splice(i, 1);
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public submitCart(clientId: number): Observable<Sell> {
    const venta = Object.assign<Sell, Partial<Sell>>(
      new Sell(),
      {
        client: { id: clientId },
        details: this.sellDetails,
        soldOn: (new Date()).toLocaleDateString()
      }
    );
    return this.salesDataService.create(venta);
  }
}
