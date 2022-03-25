/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Receipt } from 'src/models/Receipt';

@Component({
  selector: 'app-store-receipt-card',
  templateUrl: './store-receipt-card.component.html',
  styleUrls: ['./store-receipt-card.component.css']
})
export class StoreReceiptCardComponent {

  @Input() receipt: Receipt | null;

  constructor() { }
}
