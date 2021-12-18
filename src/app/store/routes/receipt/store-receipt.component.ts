/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';
import { Receipt } from 'src/models/Receipt';

@Component({
  selector: 'app-store-receipt',
  templateUrl: './store-receipt.component.html',
  styleUrls: ['./store-receipt.component.css']
})
export class StoreReceiptComponent {

  loading = true;
  receipt: Receipt | null;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.receipt) private receiptApiService: IReceiptPublicApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadReceipt();
  }

  private loadReceipt() {
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.router.navigateByUrl('/');
    } else {
      this.receiptApiService.fetchTransactionReceiptByToken(token).pipe(
        tap(receipt => {
          this.receipt = receipt;
          this.loading = false;
        }),
        catchError(() => {
          return this.router.navigateByUrl('/');
        })
      ).subscribe();
    }
  }
}
