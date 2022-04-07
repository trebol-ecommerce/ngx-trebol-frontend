/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SellDetail } from 'src/models/entities/SellDetail';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit, OnDestroy {

  private loginStateChangeSubscription: Subscription;

  cartNetValue$: Observable<number>;
  cartContents$: Observable<SellDetail[]>;
  inputEditable = true;

  constructor(
    private cartService: StoreCartService
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.cartService.cartNetValue$.pipe();
    this.cartContents$ = this.cartService.cartDetails$.pipe();
  }

  ngOnDestroy(): void {
    this.loginStateChangeSubscription?.unsubscribe();
  }

  onIncreaseProductQuantityAtIndex(index: number): void {
    this.cartService.increaseProductUnits(index);
  }

  onDecreaseProductQuantityAtIndex(index: number): void {
    this.cartService.decreaseProductUnits(index);
  }

  onRemoveProductAtIndex(index: number): void {
    this.cartService.removeProductFromCart(index);
  }

  onConfirmation(): void {
    this.inputEditable = false;
  }
}
