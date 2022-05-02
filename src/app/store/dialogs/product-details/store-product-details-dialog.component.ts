/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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
  private matchingCartIndex = NaN;
  private cartDetailsSub: Subscription;

  productNotInCart$: Observable<boolean>;
  productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoreProductDetailsDialogData,
    private cartService: StoreCartService,
  ) { }

  ngOnInit(): void {
    this.productUnitsInCart$ = merge(
      of(void 0),
      this.selfChangeTrigger.asObservable()
    ).pipe(
      switchMap(() => !Number.isNaN(this.matchingCartIndex) ?
        this.cartService.cartDetails$.pipe(
          take(1),
          map(details => (details[this.matchingCartIndex]?.units || 0))
        ) :
        of(0)
      )
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
