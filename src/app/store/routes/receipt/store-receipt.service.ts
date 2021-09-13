// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Receipt } from 'src/app/models/entities/Receipt';
import { ReceiptDetail } from 'src/app/models/entities/ReceiptDetail';
import { IReceiptPublicApiService } from 'src/app/api/receipt-public-api.iservice';

@Injectable()
export class StoreReceiptService {

  protected receiptSource: Subject<Receipt> = new BehaviorSubject(null);

  public receipt$: Observable<Receipt> = this.receiptSource.asObservable();
  public loading$: Observable<boolean> = this.receipt$.pipe(map(v => !v), startWith(true));
  public details$: Observable<ReceiptDetail[]> = this.receipt$.pipe(pluck('details'));
  public date$: Observable<string> = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.receipt) protected receiptApiService: IReceiptPublicApiService,
    protected router: Router
  ) {
  }

  public fetchReceipt(id: number): void {
    this.receiptApiService.fetchTransactionReceiptById(id).subscribe(
      receipt => {
        this.receiptSource.next(receipt);
      },
      err => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
