/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreCartService } from '../../store-cart.service';

@Component({
  selector: 'app-store-cart-review',
  templateUrl: './store-cart-review.component.html',
  styleUrls: ['./store-cart-review.component.css']
})
export class StoreCartReviewComponent
  implements OnInit {

  cartNetValue$: Observable<number>;
  inputEditable = true;

  constructor(
    private cartService: StoreCartService
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.cartService.cartNetValue$.pipe();
  }

  onConfirmation(): void {
    this.inputEditable = false;
  }
}
