/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: [ './store.component.css' ]
})
export class StoreComponent
  implements OnDestroy {

  private cartIsEmptySubscription: Subscription;

  cartIsEmpty: boolean | undefined;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartIsEmptySubscription = this.storeService.cartDetails$.pipe(
      map(details => (details.length === 0)),
      filter(isNowEmpty => (this.cartIsEmpty === undefined || isNowEmpty !== this.cartIsEmpty)),
      tap(isNowEmpty => { this.cartIsEmpty = isNowEmpty; }),
      tap(isNowEmpty => {
        if (isNowEmpty && this.route?.firstChild?.routeConfig.path === 'cart') {
          this.router.navigateByUrl('/');
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.cartIsEmptySubscription.unsubscribe();
  }
}
