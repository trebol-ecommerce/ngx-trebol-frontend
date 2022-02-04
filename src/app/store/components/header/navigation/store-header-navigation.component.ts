/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreCartService } from 'src/app/store/store-cart.service';

@Component({
  selector: 'app-store-header-navigation',
  templateUrl: './store-header-navigation.component.html',
  styleUrls: ['./store-header-navigation.component.css']
})
export class StoreHeaderNavigationComponent
  implements OnInit {

  cartHasItems$: Observable<boolean>;
  cartItemCount$: Observable<number>;

  constructor(
    private cartService: StoreCartService
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.cartService.cartDetails$.pipe(
      map(array => array.length > 0)
    );
    this.cartItemCount$ = this.cartService.cartItemCount$.pipe();
  }

}
