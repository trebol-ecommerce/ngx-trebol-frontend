/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/entities/Product';

@Component({
  selector: 'app-store-product-card',
  templateUrl: './store-product-card.component.html',
  styleUrls: ['./store-product-card.component.css']
})
export class StoreProductCardComponent {

  @Input() product = new Product();
  @Output() addToCart = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();

  constructor() { }

  onClickAddProduct(): void {
    this.addToCart.emit();
  }

  onClickViewProduct(): void {
    this.view.emit();
  }

}
