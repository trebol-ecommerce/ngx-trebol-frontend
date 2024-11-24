/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receipt } from 'src/models/Receipt';
import { environment } from 'src/environments/environment';
import { IReceiptPublicApiService } from '../../receipt-public-api.iservice';

@Injectable()
export class ReceiptPublicHttpApiService
  implements IReceiptPublicApiService {

  private readonly baseUrl = `${environment.apiUrls.public}/receipt`;

  constructor(private http: HttpClient) { }

  fetchTransactionReceiptByToken(token: string) {
    return this.http.get<Receipt>(
      `${this.baseUrl}/${token}`
    );
  }
}
