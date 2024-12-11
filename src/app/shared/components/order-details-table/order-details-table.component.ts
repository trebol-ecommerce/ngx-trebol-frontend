/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from 'src/models/entities/OrderDetail';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css']
})
export class OrderDetailsTableComponent {

  private orderDetailsSource = new BehaviorSubject<OrderDetail[]>([]);

  @Input() editable!: boolean;
  @Input() tableColumns = ['product', 'price', 'quantity', 'total', 'actions'];
  @Input() set orderDetails(v: OrderDetail[]) { this.orderDetailsSource.next(v); }
  @Output() increaseUnitsAtIndex = new EventEmitter<number>();
  @Output() decreaseUnitsAtIndex = new EventEmitter<number>();
  @Output() removeAtIndex = new EventEmitter<number>();

  orderDetails$ = this.orderDetailsSource.asObservable();

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
