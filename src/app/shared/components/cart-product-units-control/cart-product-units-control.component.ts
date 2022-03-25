/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-product-units-control',
  templateUrl: './cart-product-units-control.component.html',
  styleUrls: ['./cart-product-units-control.component.css']
})
export class CartProductUnitsControlComponent {

  @Input() units = 0;
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();

  get notInCart() { return this.units === 0; }

  constructor() { }

  onClickIncrease(): void {
    this.increase.emit();
  }
  onClickDecrease(): void {
    this.decrease.emit();
  }

}
