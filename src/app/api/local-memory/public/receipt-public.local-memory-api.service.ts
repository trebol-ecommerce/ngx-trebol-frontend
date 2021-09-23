/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receipt } from 'src/app/models/Receipt';
import { IReceiptPublicApiService } from '../../receipt-public-api.iservice';
import { MOCK_SALES } from '../mock/mock-sales.datasource';

@Injectable()
export class ReceiptPublicLocalMemoryApiService
  implements IReceiptPublicApiService {

  constructor() { }

  fetchTransactionReceiptByToken(token: string): Observable<Receipt> {
    return of(MOCK_SALES[0]).pipe(
      map(s => ({
        buyOrder: s.buyOrder,
        amount: s.netValue,
        details: s.details,
        date: new Date().toUTCString(),
        status: 'Testing'
      }))
    );
  }
}
