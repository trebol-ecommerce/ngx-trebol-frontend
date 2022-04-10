/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { CheckoutRequest } from 'src/models/CheckoutRequest';

@Component({
  selector: 'app-store-checkout-request-information-card',
  templateUrl: './store-checkout-request-information-card.component.html',
  styleUrls: ['./store-checkout-request-information-card.component.css']
})
export class StoreCheckoutRequestInformationCardComponent {

  @Input() checkoutRequest = new CheckoutRequest();

  constructor() { }
}
