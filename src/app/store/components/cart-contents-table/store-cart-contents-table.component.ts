/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SellDetail } from 'src/models/entities/SellDetail';
import { StoreCheckoutService } from 'src/app/store/store-checkout.service';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-cart-contents-table',
  templateUrl: './store-cart-contents-table.component.html',
  styleUrls: ['./store-cart-contents-table.component.css']
})
export class StoreCartContentsTableComponent {

  @Input() editable: boolean;
  @Input() details$: Observable<SellDetail[]>;
  @Input() tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    private cartService: StoreCartService
  ) {
    this.details$ = this.cartService.cartDetails$.pipe();
  }

  onClickIncreaseProductQuantity(index: number): void {
    this.cartService.increaseProductUnits(index);
  }

  onClickDecreaseProductQuantity(index: number): void {
    this.cartService.decreaseProductUnits(index);
  }

  onClickRemoveProduct(index: number): void {
    this.cartService.removeProductFromCart(index);
  }

}
