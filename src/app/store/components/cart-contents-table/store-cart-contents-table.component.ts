/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-store-cart-contents-table',
  templateUrl: './store-cart-contents-table.component.html',
  styleUrls: ['./store-cart-contents-table.component.css']
})
export class StoreCartContentsTableComponent {

  @Input() details$: Observable<SellDetail[]>;
  @Input() tableColumns: string[] = [ 'product', 'price', 'quantity', 'total', 'actions' ];

  constructor(
    private storeService: StoreService
  ) {
    this.details$ = this.storeService.cartDetails$.pipe();
  }

  onClickIncreaseProductQuantity(index: number): void {
    this.storeService.increaseProductUnits(index);
  }

  onClickDecreaseProductQuantity(index: number): void {
    this.storeService.decreaseProductUnits(index);
  }

  onClickRemoveProduct(index: number): void {
    this.storeService.removeProductFromCart(index);
  }

}
