/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutRequest } from 'src/models/CheckoutRequest';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';
import { StoreCartService } from '../../store-cart.service';
import { StoreCheckoutService } from '../../store-checkout.service';

@Component({
  selector: 'app-store-checkout-confirmation',
  templateUrl: './store-checkout-confirmation.component.html',
  styleUrls: ['./store-checkout-confirmation.component.css']
})
export class StoreCheckoutConfirmationComponent
  implements OnInit, OnDestroy {

  private checkoutButtonPressSubscrption: Subscription;

  @Output() confirmed = new EventEmitter<void>();

  loading = false;
  checkoutDetails = new ExternalPaymentRedirectionData();

  checkoutRequest: CheckoutRequest;

  constructor(
    private cartService: StoreCartService,
    private checkoutService: StoreCheckoutService
  ) {
  }

  ngOnInit(): void {
    if (this.cartService.checkoutRequestData) {
      this.checkoutRequest = this.cartService.checkoutRequestData;
    }

    this.checkoutButtonPressSubscrption = this.cartService.checkoutButtonPress.pipe(
      tap(() => {
        this.checkoutRequest = this.cartService.checkoutRequestData;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.checkoutButtonPressSubscrption.unsubscribe();
  }

  onClickRequest(): void {
    this.loading = true;
    this.cartService.cartDetails$.pipe(
      take(1),
      switchMap(details => this.checkoutService.requestPayment(this.checkoutRequest, details)),
      catchError(err => {
        this.loading = false;
        return throwError(err);
      }),
      tap(next => {
        this.confirmed.emit();
        this.checkoutDetails = next;
      })
    ).subscribe();
  }

}
