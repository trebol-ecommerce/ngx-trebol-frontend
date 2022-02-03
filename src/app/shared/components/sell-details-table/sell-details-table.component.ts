/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Sell } from 'src/models/entities/Sell';

@Component({
  selector: 'app-sell-details-table',
  templateUrl: './sell-details-table.component.html',
  styleUrls: ['./sell-details-table.component.css']
})
export class SellDetailsTableComponent {

  @Input() sell: Sell;
  @Input() tableColumns = [ 'product', 'price', 'quantity' ];

  constructor() { }

}
