/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-store-header-navigation',
  templateUrl: './store-header-navigation.component.html',
  styleUrls: ['./store-header-navigation.component.css']
})
export class StoreHeaderNavigationComponent
  implements OnInit {

  cartHasItems$: Observable<boolean>;
  cartItemCountLabel$: Observable<string>;
  cartNetValue$: Observable<number>;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.storeService.cartDetails$.pipe(
      map(array => array.length > 0)
    );
    this.cartItemCountLabel$ = this.storeService.cartItemCount$.pipe(
      map(total => total + ' item' + (total > 1 ? 's' : ''))
    );
    this.cartNetValue$ = this.storeService.cartNetValue$.pipe();
  }

}
