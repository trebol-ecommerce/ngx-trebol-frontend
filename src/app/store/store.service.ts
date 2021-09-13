// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Product } from 'src/app/models/entities/Product';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { IStoreApiService } from '../api/store-api.iservice';
import { environment } from 'src/environments/environment';

@Injectable()
export class StoreService
  implements OnDestroy {

  protected checkoutURL = environment.apiUrls.public;
  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);
  protected sellSubtotalValue: number;

  public cartDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public cartItemCount$: Observable<number>;
  public cartSubtotalValue$: Observable<number>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) protected storeApiService: IStoreApiService
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

  protected findSellDetailsIndexByProductBarcode(barcode: string): number {
    return this.sellDetails.findIndex(d => d.product?.barcode === barcode);
  }

  public addProductToCart(product: Product): void {
    const index: number = this.findSellDetailsIndexByProductBarcode(product.barcode);

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
    return this.storeApiService.submitCart(this.sellDetails);
  }
}
