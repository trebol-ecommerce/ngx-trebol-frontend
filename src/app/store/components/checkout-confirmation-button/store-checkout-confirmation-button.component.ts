/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-checkout-confirmation-button',
  templateUrl: './store-checkout-confirmation-button.component.html',
  styleUrls: ['./store-checkout-confirmation-button.component.css']
})
export class StoreCheckoutConfirmationButtonComponent {

  @Input() disabled = false;

  constructor() { }
}
