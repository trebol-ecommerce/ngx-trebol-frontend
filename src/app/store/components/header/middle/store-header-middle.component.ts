/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-header-middle',
  templateUrl: './store-header-middle.component.html',
  styleUrls: ['./store-header-middle.component.css']
})
export class StoreHeaderMiddleComponent {

  label = $localize`:Label for title of application:Tienda On-line`;

  constructor() { }

}
