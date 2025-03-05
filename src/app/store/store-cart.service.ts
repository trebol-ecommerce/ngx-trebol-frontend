/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { Product } from 'src/models/entities/Product';
import { OrderDetail } from 'src/models/entities/OrderDetail';

@Injectable({ providedIn: 'root' })
export class StoreCartService {

  private cartDetailsSource = new BehaviorSubject<OrderDetail[]>([]);
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
    const index: number = this.findOrderDetailIndexByProductBarcode(product.barcode);

    if (index !== -1) {
      this.cartDetailsSource.value[index].units++;
    } else {
      const newOrderDetail: OrderDetail = {
        product,
        units: 1
      };
      this.cartDetailsSource.value.push(newOrderDetail);
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
      if (matchingDetail.units > 1) {
        matchingDetail.units--;
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

  private findOrderDetailIndexByProductBarcode(barcode: string): number {
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
