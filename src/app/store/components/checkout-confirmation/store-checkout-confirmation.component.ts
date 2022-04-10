/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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

  private checkoutRequestSource = new BehaviorSubject<CheckoutRequest>(null);
  private checkoutButtonPressSub: Subscription;

  @Output() confirmed = new EventEmitter<void>();

  loading = false;
  checkoutDetails = new ExternalPaymentRedirectionData();

  checkoutRequest$ = this.checkoutRequestSource.asObservable();

  constructor(
    private cartService: StoreCartService,
    private checkoutService: StoreCheckoutService
  ) {
  }

  ngOnInit(): void {
    if (this.cartService.checkoutRequestData) {
      this.checkoutRequestSource.next(this.cartService.checkoutRequestData);
    }

    this.checkoutButtonPressSub = this.cartService.checkoutButtonPress.pipe(
      take(1),
      tap(() => this.checkoutRequestSource.next(this.cartService.checkoutRequestData))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.checkoutButtonPressSub?.unsubscribe();
    this.confirmed.complete();
  }

  onClickRequest(): void {
    this.loading = true;
    this.getPayment().pipe(
      switchMap(payment => this.checkoutService.requestPayment(payment.data, payment.cartDetails)),
      tap(
        next => {
          this.confirmed.emit();
          this.checkoutDetails = next;
        },
        err => {
          this.loading = false;
        }
      )
    ).subscribe();
  }

  private getPayment() {
    return this.cartService.cartDetails$.pipe(
      take(1),
      switchMap(cartDetails => (
        this.checkoutRequest$.pipe(
          take(1),
          map(data => (
            {
              data,
              cartDetails
            }
          ))
        )
      ))
    );
  }

}
