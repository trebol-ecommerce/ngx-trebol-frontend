/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { Sell } from 'src/models/entities/Sell';

@Component({
  selector: 'app-sell-information',
  templateUrl: './sell-information.component.html',
  styleUrls: ['./sell-information.component.css']
})
export class SellInformationComponent {

  @Input() sell: Sell;

  constructor() { }

}
