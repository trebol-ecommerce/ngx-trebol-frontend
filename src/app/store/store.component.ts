/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session.service';
import { StoreCartService } from './store-cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: [ './store.component.css' ]
})
export class StoreComponent
  implements OnDestroy {

  private readonly restrictedUrl = '/store/cart';
  private readonly exitUrl = '/store';
  private restrictingConditionsSub: Subscription;

  readonly whatsapp = environment.whatsapp;

  constructor(
    private cartService: StoreCartService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.restrictingConditionsSub = this.watchRestrictingConditions().subscribe();
  }

  ngOnDestroy(): void {
    this.restrictingConditionsSub.unsubscribe();
  }

  private watchRestrictingConditions() {
    return merge(
      this.cartService.cartDetails$.pipe(
        map(details => (details.length === 0))
      ),
      this.sessionService.userHasActiveSession$.pipe(
        map(hasActiveSession => !hasActiveSession)
      )
    ).pipe(
      filter(restrictingCondition => restrictingCondition && this.router.routerState?.snapshot?.url === this.restrictedUrl),
      tap(() => this.router.navigateByUrl(this.exitUrl))
    );
  }
}
