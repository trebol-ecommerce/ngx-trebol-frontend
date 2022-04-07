/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-cart-product-units-control',
  templateUrl: './cart-product-units-control.component.html',
  styleUrls: ['./cart-product-units-control.component.css']
})
export class CartProductUnitsControlComponent
  implements OnDestroy {

  @Input() units = 0;
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();

  get oneOrLessUnits() { return (this.units <= 1); }

  constructor() { }

  ngOnDestroy(): void {
    this.increase.complete();
    this.decrease.complete();
  }

  onClickIncrease(): void {
    this.increase.emit();
  }
  onClickDecrease(): void {
    this.decrease.emit();
  }

}
