/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ExternalPaymentRedirectionData } from 'src/models/ExternalPaymentRedirectionData';

@Component({
  selector: 'app-store-checkout-button',
  templateUrl: './store-checkout-button.component.html',
  styleUrls: ['./store-checkout-button.component.css']
})
export class StoreCheckoutButtonComponent {

  private innerCheckoutDetails = new ExternalPaymentRedirectionData();

  disabled = true;

  @Input() innerControlName = 'token_ws';

  @Input()
  get checkoutDetails() { return this.innerCheckoutDetails; }
  set checkoutDetails(value: ExternalPaymentRedirectionData) {
    if (value) {
      this.disabled = false;
      this.innerCheckoutDetails = value;
    }
  }

  constructor() { }
}
