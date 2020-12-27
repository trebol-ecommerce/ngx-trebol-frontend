// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { StoreReceiptService } from './store-receipt.service';
import { Receipt } from 'src/app/models/entities/Receipt';
import { ReceiptDetail } from 'src/app/models/entities/ReceiptDetail';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent {

  protected receipt$: Observable<Receipt>;

  public loading$: Observable<boolean>;
  public details$: Observable<ReceiptDetail[]>;
  public date$: Observable<string>;

  constructor(
    protected service: StoreReceiptService,
    protected route: ActivatedRoute
  ) {
    this.receipt$ = this.service.receipt$.pipe();
    this.loading$ = this.service.loading$.pipe();
    this.details$ = this.service.details$.pipe();
    this.date$ = this.service.date$.pipe();

    this.loadReceipt();
  }

  private loadReceipt() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.fetchReceipt(id);
  }
}
