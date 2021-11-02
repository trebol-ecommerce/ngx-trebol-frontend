/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, pluck, startWith, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { Receipt } from 'src/app/models/Receipt';

// TODO figure out other uses for this service, otherwise deprecate/remove it
@Injectable()
export class StoreReceiptService {

  private receiptSource = new BehaviorSubject<Receipt>(null);

  receipt$ = this.receiptSource.asObservable();
  loading$ = this.receipt$.pipe(map(v => !v), startWith(true));
  details$ = this.receipt$.pipe(pluck('details'));
  date$ = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.receipt) private receiptApiService: IReceiptPublicApiService,
    private router: Router
  ) { }

  /** Request receipt metadata passing the transaction token to a external API.
   * If it fails or the token is falsy, redirects user away from receipt page. */
  fetchReceipt(token: string): void {
    if (!token) {
      this.router.navigateByUrl('/');
    } else {
      this.receiptApiService.fetchTransactionReceiptByToken(token).pipe(
        tap(receipt => {
          this.receiptSource.next(receipt);
        }),
        catchError(() => {
          return this.router.navigateByUrl('/');
        })
      ).subscribe();
    }
  }
}
