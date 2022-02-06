/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { SELL_STATUS_NAMES_MAP } from 'src/text/sell-status-names';
import { ManagementSalesService } from '../../routes/sales/management-sales.service';
import { ManagementSellReviewDialogData } from './ManagementSellReviewDialogData';

@Component({
  selector: 'app-management-sell-review-dialog',
  templateUrl: './management-sell-review-dialog.component.html',
  styleUrls: ['./management-sell-review-dialog.component.css']
})
export class ManagementSellReviewDialogComponent {

  private busyStatusSource = new BehaviorSubject(false);

  isBusy$ = this.busyStatusSource.asObservable().pipe();

  get dialogTitle() { return $localize`:Title of dialog used to view details of one sell:Details of sell #${ this.data.sell.buyOrder }:buyOrder:`; }
  get isNotPaid() { return this.data.sell?.status < SELL_STATUS_NAMES_MAP.get(3); }
  get isNotConfirmed() { return this.data.sell?.status < SELL_STATUS_NAMES_MAP.get(4); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ManagementSellReviewDialogData,
    private sharedDialogService: SharedDialogService,
    private salesService: ManagementSalesService,
    private snackBarService: MatSnackBar
  ) { }

  onClickReject(): void {
    this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt to confirm mark of an order as rejected:Confirm to reject this sell`,
      message: $localize`:Paragraph asking confirmation to reject an order, and explaining that the action cannot be undone and it will turn to an unusable state:This cannot be undone; once a sell is rejected it remains read-only`
    }).pipe(
      filter(didConfirm => didConfirm),
      tap(() => this.busyStatusSource.next(true)),
      switchMap(() => this.salesService.markRejected(this.data.sell)),
      tap(() => {
        this.salesService.reloadItems();
        this.snackBarService.open($localize`:Message of success after rejecting an order:Sell was rejected`, COMMON_DISMISS_BUTTON_LABEL);
      }),
      catchError(err => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return throwError(err);
      }),
      switchMap(() => this.salesService.fetch(this.data.sell)),
      tap(next => this.data.sell = next),
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickConfirm(): void {
    this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt to confirm mark of an order as reviewed/confirmed:Confirm review of this sell`,
      message: $localize`:Paragraph asking confirmation to confirm/mark an order as reviewed, and explaining that the action cannot be undone and it will trigger sending an email to the client and update the state of the order:This cannot be undone; the client will receive an e-mail with a receipt, and will be advised of the state of their purchase.`
    }).pipe(
      tap(() => this.busyStatusSource.next(true)),
      switchMap(() => this.salesService.markConfirmed(this.data.sell)),
      tap(() => {
        this.salesService.reloadItems();
        this.snackBarService.open($localize`:Message of success after confirming an order:Sell was confirmed`, COMMON_DISMISS_BUTTON_LABEL);
      }),
      catchError(err => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return throwError(err);
      }),
      switchMap(() => this.salesService.fetch(this.data.sell)),
      tap(next => this.data.sell = next),
      finalize(() =>this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickComplete(): void {
    this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt to confirm mark of an order as completed/delivered:Confirm completion of this sell`,
      message: $localize`:Paragraph asking confirmation to confirm delivery completion for of an order, and explaining that the action cannot be undone and it will turn to an unusable state:This cannot be undone; it is assumed the client received their order; the sell will remain read-only after this step.`
    }).pipe(
      tap(() => this.busyStatusSource.next(true)),
      switchMap(() => this.salesService.markComplete(this.data.sell)),
      tap(() => {
        this.salesService.reloadItems();
        this.snackBarService.open($localize`:Message of success after completing an order:Congratulations! Sell is complete`, COMMON_DISMISS_BUTTON_LABEL);
      }),
      catchError(err => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return throwError(err);
      }),
      switchMap(() => this.salesService.fetch(this.data.sell)),
      tap(next => this.data.sell = next),
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }


}
