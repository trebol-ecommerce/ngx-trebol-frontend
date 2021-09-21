// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnDestroy } from '@angular/core';
import { StoreService } from './store.service';
import { Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
