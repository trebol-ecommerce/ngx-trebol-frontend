/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
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
  inputEditable = true;

  constructor(
    private cartService: StoreCartService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartNetValue$ = this.cartService.cartNetValue$.pipe();
    this.loginStateChangeSubscription = this.appService.isLoggedInChanges$.pipe(
      filter(isLoggedIn => !isLoggedIn),
      tap(() => this.router.navigateByUrl('/'))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.loginStateChangeSubscription?.unsubscribe();
  }

  onConfirmation(): void {
    this.inputEditable = false;
  }
}
