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
import { Sell } from 'src/models/entities/Sell';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { ManagementSellReviewDialogComponent } from '../../dialogs/sell-review/management-sell-review-dialog.component';
import { ManagementSellReviewDialogData } from '../../dialogs/sell-review/ManagementSellReviewDialogData';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementSalesService } from './management-sales.service';

export interface SalesTableRow {
  item: Partial<Sell>;
  focused: boolean;
}

@Component({
  selector: 'app-management-sales',
  templateUrl: './management-sales.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-sales.component.css'
  ]
})
export class ManagementSalesComponent
  extends TransactionalDataManagerComponentDirective<Sell>
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;

  tableColumns = ['buyOrder', 'date', 'customer', 'status', 'actions'];
  items$: Observable<SalesTableRow[]>;

  constructor(
    protected service: ManagementSalesService,
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

  onClickDelete(s: Sell) {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.service.removeItems([s]).pipe(
      switchMap(() => this.service.reloadItems()),
      tap(
        () => {
          const message = $localize`:Message of success after deleting a sell with buy order {{ buyOrder }} on date {{ date }}:Sell N°${s.buyOrder}:buyOrder: (${s.date}:date:) deleted`;
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
        switchMap(sell => {
          const dialogData: ManagementSellReviewDialogData = { sell };
          return this.dialogService.open(
            ManagementSellReviewDialogComponent,
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

  protected createDialogProperties(item: Sell): EntityFormDialogConfig<Sell> {
    return {
      data: {
        isNewItem: !item,
        item,
        entityType: 'sell',
        apiService: this.service.dataService
      },
      width: '80rem'
    };
  }

}
