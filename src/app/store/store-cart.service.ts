/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { Product } from 'src/models/entities/Product';
import { SellDetail } from 'src/models/entities/SellDetail';

@Injectable({ providedIn: 'root' })
export class StoreCartService {

  private cartDetailsSource = new BehaviorSubject<SellDetail[]>([]);
  private checkoutRequestSource = new BehaviorSubject<CheckoutRequest>(null);

  cartDetails$ = this.cartDetailsSource.asObservable();
  checkoutRequest$ = this.checkoutRequestSource.asObservable();
  cartItemCount$ = this.calculateItemCount();
  cartNetValue$ = this.calculateNetValue();

  constructor() { }

  reset(): void {
    this.cartDetailsSource.next([]);
  }

  addProductToCart(product: Product): void {
    const index: number = this.findSellDetailsIndexByProductBarcode(product.barcode);

    if (index !== -1) {
      this.cartDetailsSource.value[index].units++;
    } else {
      const newSellDetail: SellDetail = {
        product,
        units: 1
      };
      this.cartDetailsSource.value.push(newSellDetail);
    }

    this.cartDetailsSource.next(this.cartDetailsSource.value);
  }

  increaseProductUnits(index: number): void {
    if (index !== -1) {
      this.cartDetailsSource.value[index].units++;
      this.cartDetailsSource.next(this.cartDetailsSource.value);
    }
  }

  decreaseProductUnits(index: number): void {
    if (index !== -1) {
      const matchingDetail = this.cartDetailsSource.value[index];
      matchingDetail.units--;

      if (matchingDetail.units > 0) {
        this.cartDetailsSource.next(this.cartDetailsSource.value);
      } else {
        this.cartDetailsSource.value.splice(index, 1);
        this.cartDetailsSource.next(this.cartDetailsSource.value);
      }

    }
  }

  removeProductFromCart(index: number): void {
    if (index !== -1) {
      this.cartDetailsSource.value.splice(index, 1);
      this.cartDetailsSource.next(this.cartDetailsSource.value);
    }
  }

  updateCheckoutRequest(info: CheckoutRequest): void {
    this.checkoutRequestSource.next(info);
  }

  private findSellDetailsIndexByProductBarcode(barcode: string): number {
    return this.cartDetailsSource.value.findIndex(d => (d.product?.barcode === barcode));
  }

  private calculateItemCount(): Observable<number> {
    return this.cartDetails$.pipe(
      map(array => (array.length === 0) ?
        0 :
        array.map(detail => detail.units)
          .reduce((a, b) => (a + b))
      )
    );
  }

  private calculateNetValue(): Observable<number> {
    return this.cartDetails$.pipe(
      map(array => (array.length === 0) ?
        0 :
        array.map(p => p.product.price * p.units)
          .reduce((a, b) => a + b)
      )
    );
  }
}
