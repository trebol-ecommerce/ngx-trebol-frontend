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
import { ORDER_STATUS_NAMES_MAP } from 'src/text/order-status-names';
import { ManagementOrdersService } from '../../routes/orders/management-orders.service';
import { ManagementOrderReviewDialogData } from './ManagementOrderReviewDialogData';

@Component({
  selector: 'app-management-order-review-dialog',
  templateUrl: './management-order-review-dialog.component.html',
  styleUrls: ['./management-order-review-dialog.component.css']
})
export class ManagementOrderReviewDialogComponent
  implements OnDestroy {

  private busyStatusSource = new BehaviorSubject(false);
  private operationSub: Subscription;

  isBusy$ = this.busyStatusSource.asObservable().pipe();
  detailsTableColumns = ['product', 'price', 'quantity'];

  get dialogTitle() { return $localize`:Title of dialog used to view details of one order:Details of order #${ this.data.order.buyOrder }:buyOrder:`; }
  get isNotPaid() { return this.data.order?.status !== ORDER_STATUS_NAMES_MAP.get(3); }
  get isNotConfirmed() { return this.data.order?.status !== ORDER_STATUS_NAMES_MAP.get(4); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ManagementOrderReviewDialogData,
    private salesService: ManagementOrdersService,
    private snackBarService: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    this.busyStatusSource.complete();
    this.operationSub?.unsubscribe();
  }

  onClickReject(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateOrderDataAfter(
      this.salesService.markRejected(this.data.order),
      $localize`:Message of success after rejecting an order:Order was rejected`
    ).pipe(
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickConfirm(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateOrderDataAfter(
      this.salesService.markConfirmed(this.data.order),
      $localize`:Message of success after confirming an order:Order was confirmed`
    ).pipe(
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  onClickComplete(): void {
    this.operationSub?.unsubscribe();
    this.busyStatusSource.next(true);
    this.operationSub = this.updateOrderDataAfter(
      this.salesService.markComplete(this.data.order),
      $localize`:Message of success after completing an order:Congratulations! Order is complete`
    ).pipe(
      switchMap(() => this.salesService.reloadItems()),
      finalize(() => this.busyStatusSource.next(false))
    ).subscribe();
  }

  private updateOrderDataAfter(observable: Observable<any>, successMessage: string) {
    return observable.pipe(
      switchMap(() => this.salesService.fetch(this.data.order)),
      tap(
        order => {
          this.data.order = order;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        },
        err => this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL)
      )
    );
  }


}
