/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Receipt } from 'src/models/Receipt';
import { IReceiptPublicApiService } from '../../receipt-public-api.iservice';
import { MOCK_RECEIPTS } from '../mock/mock-receipts.datasource';

@Injectable()
export class ReceiptPublicLocalMemoryApiService
  implements IReceiptPublicApiService {

  constructor() { }

  fetchTransactionReceiptByToken(token: string): Observable<Receipt> {
    return of(MOCK_RECEIPTS.find(r => r.token === token)).pipe(
      switchMap(nonFalsy => nonFalsy ?
        of(nonFalsy) :
        throwError({ status: 404 }))
    );
  }
}
