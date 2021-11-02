/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SellDetail } from 'src/app/models/entities/SellDetail';

@Component({
  selector: 'app-store-receipt-details-table',
  templateUrl: './store-receipt-details-table.component.html',
  styleUrls: ['./store-receipt-details-table.component.css']
})
export class StoreReceiptDetailsTableComponent {

  dataSource = new MatTableDataSource<SellDetail>();

  @Input()
  get details() { return this.dataSource.data; }
  set details(data: SellDetail[]) { this.dataSource.data = data; }

  @Input() tableColumns: string[] = [ 'product', 'price', 'quantity', 'total' ];

  constructor() { }

}
