/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable } from 'rxjs';
import { Receipt } from 'src/models/Receipt';

export interface IReceiptPublicApiService {
  fetchTransactionReceiptByToken(token: string): Observable<Receipt>;
}
