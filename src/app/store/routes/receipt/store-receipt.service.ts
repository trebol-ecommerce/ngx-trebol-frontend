/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { Receipt } from 'src/app/models/Receipt';
import { ReceiptDetail } from 'src/app/models/ReceiptDetail';

@Injectable()
export class StoreReceiptService {

  private receiptSource: Subject<Receipt> = new BehaviorSubject(null);

  receipt$ = this.receiptSource.asObservable();
  loading$ = this.receipt$.pipe(map(v => !v), startWith(true));
  details$ = this.receipt$.pipe(pluck('details'));
  date$ = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.receipt) private receiptApiService: IReceiptPublicApiService,
    private router: Router
  ) {
  }

  fetchReceipt(id: string): void {
    this.receiptApiService.fetchTransactionReceiptByToken(id).subscribe(
      receipt => {
        this.receiptSource.next(receipt);
      },
      err => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
