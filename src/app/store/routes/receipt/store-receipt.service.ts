/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, throwError } from 'rxjs';
import { catchError, map, pluck, startWith, switchMap, take, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { Receipt } from 'src/models/Receipt';

@Injectable()
export class StoreReceiptService {

  private receiptSource = new BehaviorSubject<Receipt>(null);

  receipt$ = this.receiptSource.asObservable();
  loading$ = this.receipt$.pipe(map(v => !v), startWith(true));
  details$ = this.receipt$.pipe(pluck('details'));
  date$ = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.receipt) private receiptApiService: IReceiptPublicApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Request receipt metadata reading the transaction token from query parameters.
   * If it fails or the token is falsy, redirects user away from receipt page.
   */
  fetchReceipt() {
    return this.route.queryParamMap.pipe(
      take(1),
      switchMap(queryParams => {
        const token = queryParams.get('token');
        return (!token) ?
          throwError({ status: 500 }) :
          this.receiptApiService.fetchTransactionReceiptByToken(token);
      }),
      tap(receipt => this.receiptSource.next(receipt)),
      catchError(() => from(this.router.navigateByUrl('/')))
    );
  }
}
