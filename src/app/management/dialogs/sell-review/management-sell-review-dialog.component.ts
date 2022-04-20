/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { SELL_STATUS_NAMES_MAP } from 'src/text/sell-status-names';
import { ManagementSalesService } from '../../routes/sales/management-sales.service';
import { ManagementSellReviewDialogData } from './ManagementSellReviewDialogData';

@Component({
  selector: 'app-management-sell-review-dialog',
  templateUrl: './management-sell-review-dialog.component.html',
  styleUrls: ['./management-sell-review-dialog.component.css']
})
export class ManagementSellReviewDialogComponent
  implements OnDestroy {

  private busyStatusSource = new BehaviorSubject(false);
  private operationSub: Subscription;

  isBusy$ = this.busyStatusSource.asObservable().pipe();
  detailsTableColumns = ['product', 'price', 'quantity'];

  get dialogTitle() { return $localize`:Title of dialog used to view details of one sell:Details of sell #${ this.data.sell.buyOrder }:buyOrder:`; }
  get isNotPaid() { return this.data.sell?.status !== SELL_STATUS_NAMES_MAP.get(3); }
  get isNotConfirmed() { return this.data.sell?.status !== SELL_STATUS_NAMES_MAP.get(4); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ManagementSellReviewDialogData,
    private salesService: ManagementSalesService,
    private snackBarService: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    this.busyStatusSource.complete();
    this.operationSub?.unsubscribe();
  }

  onClickReject(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markRejected(this.data.sell),
      $localize`:Message of success after rejecting an order:Sell was rejected`
    ).pipe(
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickConfirm(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markConfirmed(this.data.sell),
      $localize`:Message of success after confirming an order:Sell was confirmed`
    ).pipe(
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickComplete(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markComplete(this.data.sell),
      $localize`:Message of success after completing an order:Congratulations! Sell is complete`
    ).pipe(
      switchMap(() => this.salesService.reloadItems()),
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  private updateSellDataAfter(observable: Observable<any>, successMessage: string) {
    return observable.pipe(
      switchMap(() => this.salesService.fetch(this.data.sell)),
      tap(
        sell => {
          this.data.sell = sell;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        },
        err => this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL)
      )
    );
  }


}
