// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/entities/Product';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreService } from '../../store.service';

export interface StoreProductDetailsDialogData {
  product: Product;
}

@Component({
  selector: 'app-store-product-details-dialog',
  templateUrl: './store-product-details-dialog.component.html',
  styleUrls: ['./store-product-details-dialog.component.css']
})
export class StoreProductDetailsDialogComponent
  implements OnInit, OnDestroy {

  protected matchingCartSellDetailSource: Subject<SellDetail> = new BehaviorSubject(null);

  protected matchingCartIndex: number;
  public product: Product;

  public matchingCartSellDetail$: Observable<SellDetail> = this.matchingCartSellDetailSource.asObservable();
  public productNotInCart$: Observable<boolean>;
  public productUnitsInCart$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: StoreProductDetailsDialogData,
    public storeService: StoreService,
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
        const index = details.findIndex(d => d.product?.id === this.product.id);
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

  public onClickIncreaseProductQuantity(): void {
    if (this.matchingCartIndex !== -1) {
      this.storeService.increaseProductUnits(this.matchingCartIndex);
    } else {
      this.storeService.addProductToCart(this.product);
    }
  }
  public onClickDecreaseProductQuantity(): void {
    this.storeService.decreaseProductUnits(this.matchingCartIndex);
  }

}
