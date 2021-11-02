/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Receipt } from 'src/app/models/Receipt';
import { IReceiptPublicApiService } from '../../receipt-public-api.iservice';
import { MOCK_RECEIPTS } from '../mock/mock-receipts.datasource';

@Injectable()
export class ReceiptPublicLocalMemoryApiService
  implements IReceiptPublicApiService {

  constructor() { }

  fetchTransactionReceiptByToken(token: string): Observable<Receipt> {
    const matchByToken = MOCK_RECEIPTS.find(r => r.token === token);
    return (!matchByToken) ? throwError({ status : 404 }) : of(matchByToken);
  }
}
