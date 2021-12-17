/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReceiptDetail } from 'src/models/ReceiptDetail';

@Component({
  selector: 'app-store-receipt-details-table',
  templateUrl: './store-receipt-details-table.component.html',
  styleUrls: ['./store-receipt-details-table.component.css']
})
export class StoreReceiptDetailsTableComponent {

  dataSource = new MatTableDataSource<ReceiptDetail>();

  @Input()
  get details() { return this.dataSource.data; }
  set details(data: ReceiptDetail[]) { this.dataSource.data = data; }

  @Input() tableColumns: string[] = [ 'product', 'price', 'quantity', 'total' ];

  constructor() { }

}
