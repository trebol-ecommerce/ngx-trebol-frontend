// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { Product } from 'src/app/data/models/entities/Product';
import { Sell } from 'src/app/data/models/entities/Sell';
import { SellDetail } from 'src/app/data/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/data/models/ExternalPaymentRedirectionData';
import { checkoutURL } from 'src/environments/store.environment';

@Injectable()
export class StoreService
  implements OnDestroy {

  protected checkoutURL = checkoutURL;
  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);
  protected sellSubtotalValue: number;

  public cartDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public cartItemCount$: Observable<number>;
  public cartSubtotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.salesCrud) protected salesDataService: EntityCrudIService<Sell>,
    protected httpClient: HttpClient
  ) {
    this.cartItemCount$ = this.cartDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(p => p.units).reduce((a, b) => a + b);
        }
      )
    );

    this.cartSubtotalValue$ = this.cartDetails$.pipe(
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

  public reset(): void {
    this.sellDetails = [];
    this.sellDetailsSource.next([]);
  }

  protected findSellDetailsIndexByProductId(id: number): number {
    return this.sellDetails.findIndex(d => d.product?.id === id);
  }

  protected parseFormData(subtotal: number): FormData {
    const total = String(Math.round(subtotal * 1.19));
    const formData = new FormData();
    formData.append('tr_amount', total);
    formData.append('tr_id', '1');
    return formData;
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

  public submitCart(): Observable<ExternalPaymentRedirectionData> {
    const data: FormData = this.parseFormData(this.sellSubtotalValue);
    return this.httpClient.post<ExternalPaymentRedirectionData>(
      this.checkoutURL,
      data
    );
  }
}
