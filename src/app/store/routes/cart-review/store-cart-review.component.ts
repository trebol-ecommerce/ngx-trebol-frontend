// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, empty, EMPTY } from 'rxjs';
import { concatMap, map, take, tap, mapTo } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreService } from 'src/app/store/store.service';
import { StoreCustomerLoginWatchService } from 'src/app/store/store-customer-login-watch.service';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  public sellDetails$: Observable<SellDetail[]>;
  public cartSubtotalValue$: Observable<number>;
  public cartTotalValue$: Observable<number>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected router: Router,
    protected customerLoginWatchService: StoreCustomerLoginWatchService
  ) {
    // TODO refactor this into a routing guard
    this.storeService.cartDetails$.pipe(take(1)).subscribe(
      array => { if (array.length === 0) { this.router.navigateByUrl('/store'); } }
    );
  }

  ngOnInit(): void {
    this.sellDetails$ = this.storeService.cartDetails$.pipe();
    this.cartSubtotalValue$ = this.storeService.cartSubtotalValue$.pipe();

    this.cartTotalValue$ = this.storeService.cartSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  public onClickIncreaseProductQuantity(index: number): void {
    this.storeService.increaseProductUnits(index);
  }

  public onClickDecreaseProductQuantity(index: number): void {
    this.storeService.decreaseProductUnits(index);
  }

  public onClickRemoveProduct(index: number): void {
    this.storeService.removeProductFromCart(index);
  }

  public onClickAccept(): void {
    this.customerLoginWatchService.initiateCheckoutOrRequireAuthentication();
  }
}
