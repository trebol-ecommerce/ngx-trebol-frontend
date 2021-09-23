/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CheckoutRequest } from 'src/app/models/CheckoutRequest';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';
import { StoreService } from '../../store.service';

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
  checkoutRequest: Partial<CheckoutRequest> = new CheckoutRequest();

  constructor(
    private cartService: StoreService
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
    this.cartService.requestPayment().pipe(
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
