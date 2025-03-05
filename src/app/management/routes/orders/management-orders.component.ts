/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, onErrorResumeNext, switchMap, tap } from 'rxjs/operators';
import { Order } from 'src/models/entities/Order';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { ManagementOrderReviewDialogComponent } from '../../dialogs/order-review/management-order-review-dialog.component';
import { ManagementOrderReviewDialogData } from '../../dialogs/order-review/ManagementOrderReviewDialogData';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementOrdersService } from './management-orders.service';

export interface SalesTableRow {
  item: Partial<Order>;
  focused: boolean;
}

@Component({
  selector: 'app-management-orders',
  templateUrl: './management-orders.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-orders.component.css'
  ]
})
export class ManagementOrdersComponent
  extends TransactionalDataManagerComponentDirective<Order>
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;

  tableColumns = ['buyOrder', 'date', 'customer', 'status', 'actions'];
  items$: Observable<SalesTableRow[]>;

  constructor(
    protected service: ManagementOrdersService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.items$ = this.service.items$.pipe(
      map(items => items.map(item => (
        {
          item,
          focused: false
        }
      )))
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.actionSubscription?.unsubscribe();
  }

  onClickDelete(o: Order) {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.service.removeItems([o]).pipe(
      switchMap(() => this.service.reloadItems()),
      tap(
        () => {
          const message = $localize`:Message of success after deleting a order with buy order {{ buyOrder }} on date {{ date }}:Order N°${o.buyOrder}:buyOrder: (${o.date}:date:) deleted`;
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
        },
        () => {
          this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  onClickView(row: SalesTableRow): void {
    if (!row.focused) {
      row.focused = true;
      this.actionSubscription?.unsubscribe();
      this.actionSubscription = this.service.fetch(row.item).pipe(
        switchMap(order => {
          const dialogData: ManagementOrderReviewDialogData = { order };
          return this.dialogService.open(
            ManagementOrderReviewDialogComponent,
            {
              width: '50rem',
              data: dialogData
            }
          ).afterClosed();
        }),
        onErrorResumeNext(),
        finalize(() => { row.focused = false; })
      ).subscribe();
    }
  }

  protected createDialogProperties(item: Order): EntityFormDialogConfig<Order> {
    return {
      data: {
        isNewItem: !item,
        item,
        entityType: 'order',
        apiService: this.service.dataService
      },
      width: '80rem'
    };
  }

}
