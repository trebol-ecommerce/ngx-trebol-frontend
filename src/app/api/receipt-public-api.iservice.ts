/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Receipt } from 'src/app/models/Receipt';

export interface IReceiptPublicApiService {
  fetchTransactionReceiptByToken(token: string): Observable<Receipt>;
}
