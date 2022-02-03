/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Receipt } from 'src/models/Receipt';
import { StoreReceiptService } from './store-receipt.service';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent
  implements OnInit {

  loading = true;
  receipt: Receipt | null;

  constructor(
    private service: StoreReceiptService
  ) { }

  ngOnInit(): void {
    this.service.fetchReceipt().subscribe();
  }
}
