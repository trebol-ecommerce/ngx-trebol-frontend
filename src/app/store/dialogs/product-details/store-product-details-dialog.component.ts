/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { StoreService } from '../../store.service';
import { StoreProductDetailsDialogData } from './StoreProductDetailsDialogData';

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit, OnDestroy {

  private matchingCartSellDetailSource = new BehaviorSubject(null);

  private matchingCartIndex: number;

  product: Product;

  matchingCartSellDetail$ = this.matchingCartSellDetailSource.asObservable();

  productNotInCart$: Observable<boolean>;
  productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoreProductDetailsDialogData,
    private storeService: StoreService,
  ) {
    this.product = data?.product ? data.product : null;
  }

  ngOnInit(): void {
    this.productNotInCart$ = this.matchingCartSellDetail$.pipe(map(d => d === null));
    this.productUnitsInCart$ = this.matchingCartSellDetail$.pipe(
      map(d => d !== null ? d.units : 0)
    );

    this.storeService.cartDetails$.subscribe(
      details => {
        const index = details.findIndex(d => d.product?.barcode === this.product.barcode);
        if (index !== -1) {

          this.matchingCartSellDetailSource.next(details[index]);
        } else {
          this.matchingCartSellDetailSource.next(null);
        }
        this.matchingCartIndex = index;
      }
    );
  }

  ngOnDestroy(): void {
    this.matchingCartSellDetailSource.complete();
  }

  onClickIncreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.storeService.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.storeService.addProductToCart(this.product);
    }
  }
  onClickDecreaseProductQuantity(): void {
    this.storeService.decreaseProductUnits(this.matchingCartIndex);
  }

}
