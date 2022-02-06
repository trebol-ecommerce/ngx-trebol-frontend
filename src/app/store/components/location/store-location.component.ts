/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.css']
})
export class StoreLocationComponent {

  @Input() mapWidth: number = 600;
  @Input() mapHeight: number = 450;

  constructor() { }

}
