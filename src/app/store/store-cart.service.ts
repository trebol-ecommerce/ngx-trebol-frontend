/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { SellDetail } from 'src/models/entities/SellDetail';
import { CheckoutRequest } from '../../models/CheckoutRequest';

@Injectable({ providedIn: 'root' })
export class StoreCartService
  implements OnDestroy {

  private cartDetailsSource = new BehaviorSubject<SellDetail[]>([]);

  cartDetails$ = this.cartDetailsSource.asObservable();
  checkoutButtonPress = new EventEmitter<void>();
  checkoutRequestData = null;

  cartItemCount$: Observable<number>;
  cartNetValue$: Observable<number>;

  constructor() {
    this.cartItemCount$ = this.cartDetails$.pipe(
      map(array => (array.length === 0) ?
        0 :
        array.map(detail => detail.units)
             .reduce((a, b) => (a + b))
      )
    );

    this.cartNetValue$ = this.cartDetails$.pipe(
      map(array => (array.length === 0) ?
        0 :
        array.map(p => p.product.price * p.units)
             .reduce((a, b) => a + b)
      )
    );
  }

  ngOnDestroy(): void {
    this.cartDetailsSource.complete();
  }

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

  private findSellDetailsIndexByProductBarcode(barcode: string): number {
    return this.cartDetailsSource.value.findIndex(d => (d.product?.barcode === barcode));
  }
}
