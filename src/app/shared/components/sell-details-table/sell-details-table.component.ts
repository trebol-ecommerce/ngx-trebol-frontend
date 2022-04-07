/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellDetail } from 'src/models/entities/SellDetail';

@Component({
  selector: 'app-sell-details-table',
  templateUrl: './sell-details-table.component.html',
  styleUrls: ['./sell-details-table.component.css']
})
export class SellDetailsTableComponent {

  private sellDetailsSource = new BehaviorSubject<SellDetail[]>([]);

  @Input() editable!: boolean;
  @Input() tableColumns = ['product', 'price', 'quantity', 'total', 'actions'];
  @Input() set sellDetails(v: SellDetail[]) { this.sellDetailsSource.next(v); }
  @Output() increaseUnitsAtIndex = new EventEmitter<number>();
  @Output() decreaseUnitsAtIndex = new EventEmitter<number>();
  @Output() removeAtIndex = new EventEmitter<number>();

  sellDetails$ = this.sellDetailsSource.asObservable();

  constructor() { }

  onClickIncreaseProductQuantity(index: number): void {
    this.increaseUnitsAtIndex.emit(index);
  }

  onClickDecreaseProductQuantity(index: number): void {
    this.decreaseUnitsAtIndex.emit(index);
  }

  onClickRemoveProduct(index: number): void {
    this.removeAtIndex.emit(index);
  }

}
