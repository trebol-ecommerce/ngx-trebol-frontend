/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  private checkoutButtonPressSub: Subscription;

  @Output() confirmed = new EventEmitter<void>();

  loading = false;
  checkoutDetails: ExternalPaymentRedirectionData = null;

  checkoutRequest$: Observable<CheckoutRequest>;

  constructor(
    private cartService: StoreCartService,
    private checkoutService: StoreCheckoutService
  ) { }

  ngOnInit(): void {
    this.checkoutRequest$ = this.cartService.checkoutRequest$.pipe();
  }

  ngOnDestroy(): void {
    this.checkoutButtonPressSub?.unsubscribe();
    this.confirmed.complete();
  }

  onClickConfirm(): void {
    this.getCartData().pipe(
      switchMap(cart => this.checkoutService.requestTransaction(cart.data, cart.details)),
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

  // TODO use more appropiate rxjs operators
  private getCartData() {
    return this.checkoutRequest$.pipe(
      take(1),
      switchMap(data => (
        this.cartService.cartDetails$.pipe(
          take(1),
          map(details => (
            {
              data,
              details
            }
          ))
        )
      ))
    );
  }

}
