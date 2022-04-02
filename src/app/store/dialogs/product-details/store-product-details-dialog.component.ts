/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, switchMapTo, take, tap } from 'rxjs/operators';
import { StoreCartService } from '../../store-cart.service';
import { StoreProductDetailsDialogData } from './StoreProductDetailsDialogData';

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit, OnDestroy {

  private selfChangeTrigger = new Subject<void>();
  private matchingCartIndex: number;
  private cartDetailsSub: Subscription;

  productNotInCart$: Observable<boolean>;
  productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoreProductDetailsDialogData,
    private cartService: StoreCartService,
  ) { }

  ngOnInit(): void {
    this.productUnitsInCart$ = this.selfChangeTrigger.pipe(
      startWith(void 0),
      switchMapTo(this.cartService.cartDetails$.pipe(take(1))),
      map(details => details[this.matchingCartIndex]),
      map(d => (d ? d.units : 0))
    );

    this.cartDetailsSub = this.cartService.cartDetails$.pipe(
      tap(details => {
        this.matchingCartIndex = details.findIndex(d => (d.product?.barcode === this.data.product.barcode));
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.cartDetailsSub?.unsubscribe();
    this.selfChangeTrigger.complete();
  }

  onClickIncreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.cartService.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.cartService.addProductToCart(this.data.product);
    }
    this.selfChangeTrigger.next();
  }

  onClickDecreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.cartService.decreaseProductUnits(this.matchingCartIndex);
      this.selfChangeTrigger.next();
    }
  }

}
