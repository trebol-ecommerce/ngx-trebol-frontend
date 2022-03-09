/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
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
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markRejected(this.data.sell),
      $localize`:Message of success after rejecting an order:Sell was rejected`
    ).subscribe();
  }

  onClickConfirm(): void {
    this.operationSub?.unsubscribe();
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markConfirmed(this.data.sell),
      $localize`:Message of success after confirming an order:Sell was confirmed`
    ).subscribe();
  }

  onClickComplete(): void {
    this.operationSub?.unsubscribe();
    this.operationSub = this.updateSellDataAfter(
      this.salesService.markComplete(this.data.sell),
      $localize`:Message of success after completing an order:Congratulations! Sell is complete`
    ).subscribe();
  }

  private updateSellDataAfter(observable: Observable<any>, successMessage: string) {
    return observable.pipe(
      tap(() => {
        this.busyStatusSource.next(true);
        this.salesService.reloadItems();
        this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
      }),
      switchMap(() => this.salesService.fetch(this.data.sell)),
      tap(next => this.data.sell = next),
      catchError(err => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return throwError(err);
      }),
      finalize(() => this.busyStatusSource.next(false))
    );
  }


}
