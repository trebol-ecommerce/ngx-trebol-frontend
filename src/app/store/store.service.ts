import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { Product } from 'src/app/data/models/entities/Product';
import { Sell } from 'src/app/data/models/entities/Sell';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
import { environment } from 'src/environments/environment';
import { ExternalPaymentRedirectionData } from '../data/models/ExternalPaymentRedirectionData';

@Injectable()
export class StoreService
  implements OnDestroy {

  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);
  protected sellSubtotalValue: number;

  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public itemQuantity$: Observable<number>;
  public sellSubtotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sales) protected salesDataService: EntityCrudIService<Sell>,
    protected httpClient: HttpClient
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
      ),
      tap(s => { this.sellSubtotalValue = s; })
    );
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  public fetchWebpayRedirectionData(data: FormData): Observable<ExternalPaymentRedirectionData> {
    return this.httpClient.post<ExternalPaymentRedirectionData>(
      environment.checkoutURL,
      data
    );
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

  public submitCart(clientId: number): Observable<number> {
    const venta = Object.assign<Sell, Partial<Sell>>(
      new Sell(),
      {
        client: { id: clientId },
        details: this.sellDetails,
        subtotalValue: this.sellSubtotalValue
      }
    );
    return this.salesDataService.create(venta);
  }
}
