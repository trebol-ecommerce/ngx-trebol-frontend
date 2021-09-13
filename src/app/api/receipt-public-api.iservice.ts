// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Observable } from 'rxjs';
import { Receipt } from 'src/app/models/Receipt';

export interface IReceiptPublicApiService {
  fetchTransactionReceiptById(id: number): Observable<Receipt>;
}
