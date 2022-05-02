/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/entities/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  readonly stockImageUrl = environment.staticImages.defaultProductImage.url;

  @Input() product = new Product();
  @Input() showAddToCartButton = false;
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
