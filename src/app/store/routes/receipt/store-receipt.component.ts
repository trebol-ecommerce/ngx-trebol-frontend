/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReceiptDetail } from 'src/app/models/ReceiptDetail';
import { StoreReceiptService } from './store-receipt.service';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent {

  loading$: Observable<boolean>;
  details$: Observable<ReceiptDetail[]>;
  date$: Observable<string>;

  constructor(
    private service: StoreReceiptService,
    private route: ActivatedRoute
  ) {
    this.loading$ = this.service.loading$.pipe();
    this.details$ = this.service.details$.pipe();
    this.date$ = this.service.date$.pipe();

    this.loadReceipt();
  }

  private loadReceipt() {
    const token = this.route.snapshot.paramMap.get('token');
    this.service.fetchReceipt(token);
  }
}
