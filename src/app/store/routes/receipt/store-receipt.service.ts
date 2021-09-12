// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IStoreApiService } from 'src/app/api/store-api.iservice';
import { Receipt } from 'src/app/models/entities/Receipt';
import { ReceiptDetail } from 'src/app/models/entities/ReceiptDetail';

@Injectable()
export class StoreReceiptService {

  protected receiptSource: Subject<Receipt> = new BehaviorSubject(null);

  public receipt$: Observable<Receipt> = this.receiptSource.asObservable();
  public loading$: Observable<boolean> = this.receipt$.pipe(map(v => !v), startWith(true));
  public details$: Observable<ReceiptDetail[]> = this.receipt$.pipe(pluck('details'));
  public date$: Observable<string> = this.receipt$.pipe(pluck('date'));

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) protected storeApiService: IStoreApiService,
    protected router: Router
  ) {
  }

  public fetchReceipt(id: number): void {
    this.storeApiService.fetchTransactionReceiptById(id).subscribe(
      receipt => {
        this.receiptSource.next(receipt);
      },
      err => {
        this.router.navigateByUrl('/');
      }
    );
  }
}
