/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ExternalPaymentRedirectionData } from 'src/app/models/ExternalPaymentRedirectionData';

@Component({
  selector: 'app-store-checkout-button',
  templateUrl: './store-checkout-button.component.html',
  styleUrls: ['./store-checkout-button.component.css']
})
export class StoreCheckoutButtonComponent {

  private innerCheckoutDetails = new ExternalPaymentRedirectionData();

  disabled = true;

  @Input()
  get checkoutDetails() { return this.innerCheckoutDetails; }
  set checkoutDetails(value: ExternalPaymentRedirectionData) {
    if (value.token && value.url) {
      this.disabled = false;
      this.innerCheckoutDetails = value;
    }
  }

  constructor() { }
}
