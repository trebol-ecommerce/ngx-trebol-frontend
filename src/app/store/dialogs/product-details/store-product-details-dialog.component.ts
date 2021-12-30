/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SellDetail } from 'src/models/entities/SellDetail';
import { StoreCartService } from '../../store-cart.service';
import { StoreProductDetailsDialogData } from './StoreProductDetailsDialogData';

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit, OnDestroy {

  private matchingCartSellDetailSource = new ReplaySubject<SellDetail>(1);
  private matchingCartIndex: number;

  matchingCartSellDetail$ = this.matchingCartSellDetailSource.asObservable();

  productNotInCart$: Observable<boolean>;
  productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoreProductDetailsDialogData,
    private cartService: StoreCartService,
  ) { }

  ngOnInit(): void {
    this.productNotInCart$ = this.matchingCartSellDetail$.pipe(map(d => d === null));
    this.productUnitsInCart$ = this.matchingCartSellDetail$.pipe(
      map(d => d !== null ? d.units : 0)
    );

    this.cartService.cartDetails$.pipe(
      tap(details => {
        const index = details.findIndex(d => (d.product?.barcode === this.data.product.barcode));
        if (index !== -1) {
          this.matchingCartSellDetailSource.next(details[index]);
        } else {
          this.matchingCartSellDetailSource.next(null);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.matchingCartSellDetailSource.complete();
  }

  onClickIncreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.cartService.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.cartService.addProductToCart(this.data.product);
    }
  }
  onClickDecreaseProductQuantity(): void {
    this.cartService.decreaseProductUnits(this.matchingCartIndex);
  }

}
