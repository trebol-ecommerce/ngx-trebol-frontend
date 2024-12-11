/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Receipt } from 'src/models/Receipt';
import { ORDER_STATUS_LOCALIZED_MAP, ORDER_STATUS_NAMES_MAP } from 'src/text/order-status-names';

@Component({
  selector: 'app-store-receipt-card',
  templateUrl: './store-receipt-card.component.html',
  styleUrls: ['./store-receipt-card.component.css']
})
export class StoreReceiptCardComponent {

  @Input() receipt: Receipt | null;

  // TODO use a more elegant approach
  get transactionStatus() { return this.receipt?.status ? ORDER_STATUS_LOCALIZED_MAP.get(this.receipt.status) : ''; }

  constructor() { }
}
