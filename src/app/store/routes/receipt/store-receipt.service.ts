/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { Receipt } from 'src/models/Receipt';

@Injectable({ providedIn: 'root' })
export class StoreReceiptService {

  private receiptSource = new BehaviorSubject<Receipt>(null);

  receipt$ = this.receiptSource.asObservable();
  loading$ = this.receipt$.pipe(map(v => !v), startWith(true));
  details$ = this.receipt$.pipe(pluck('details'));
  date$ = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_INJECTION_TOKENS.receipt) private receiptApiService: IReceiptPublicApiService
  ) { }

  /**
   * Request receipt metadata reading the transaction token from query parameters.
   * If it fails or the token is falsy, redirects user away from receipt page.
   */
  fetchReceipt(token: string) {
    return this.receiptApiService.fetchTransactionReceiptByToken(token);
  }
}
