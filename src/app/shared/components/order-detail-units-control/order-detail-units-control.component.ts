/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-order-detail-units-control',
  templateUrl: './order-detail-units-control.component.html',
  styleUrls: ['./order-detail-units-control.component.css']
})
export class OrderDetailUnitsControlComponent
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
