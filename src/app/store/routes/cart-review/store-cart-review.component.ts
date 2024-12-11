/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/models/entities/OrderDetail';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  cartNetValue$: Observable<number>;
  cartContents$: Observable<OrderDetail[]>;
  inputEditable = true;

  constructor(
    private cartService: StoreCartService
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.cartService.cartNetValue$.pipe();
    this.cartContents$ = this.cartService.cartDetails$.pipe();
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
