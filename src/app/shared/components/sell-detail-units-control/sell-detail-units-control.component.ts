/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-sell-detail-units-control',
  templateUrl: './sell-detail-units-control.component.html',
  styleUrls: ['./sell-detail-units-control.component.css']
})
export class SellDetailUnitsControlComponent
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
