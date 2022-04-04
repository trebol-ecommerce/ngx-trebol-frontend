/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { SellFormComponent } from 'src/app/management/components/sell-form/sell-form.component';
import { Sell } from 'src/models/entities/Sell';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { ManagementSellReviewDialogComponent } from '../../dialogs/sell-review/management-sell-review-dialog.component';
import { ManagementSellReviewDialogData } from '../../dialogs/sell-review/ManagementSellReviewDialogData';
import { DataManagerServiceDirective } from '../../directives/data-manager/data-manager.service.directive';
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
  implements OnInit {

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
    this.init(this.service);
  }

  onClickDelete(s: Sell) {
    this.service.removeItems([s]).pipe(
      map(results => results[0]),
      catchError(error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return of(error);
      }),
      tap(() => {
        const message = $localize`:Message of success after deleting a sell with buy order {{ buyOrder }} on date {{ date }}:Sell N°${s.buyOrder}:buyOrder: (${s.date}:date:) deleted`;
        this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
        this.service.reloadItems();
      })
    ).subscribe();
  }

  onClickView(row: SalesTableRow): void {
    if (!row.focused) {
      row.focused = true;
      this.service.fetch(row.item).pipe(
        catchError(() => EMPTY),
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
        finalize(() => { row.focused = false; })
      ).subscribe();
    }
  }

  protected init(service: DataManagerServiceDirective<Sell>): void {
    this.loading$ = service.loading$.pipe();
    this.busy$ = service.focusedItems$.pipe(map(items => items?.length > 0));
    this.items$ = service.items$.pipe(
      map(items => items.map(item => (
        {
          item,
          focused: false
        }
      )))
    );
    this.totalCount$ = service.totalCount$.pipe();
    this.canEdit$ = service.canEdit$.pipe();
    this.canAdd$ = service.canAdd$.pipe();
    this.canDelete$ = service.canDelete$.pipe();
    service.pageSize = this.pageSizeOptions[0];
  }

  protected createDialogProperties(item: Sell): EntityFormDialogConfig<Sell> {
    return {
      data: {
        item,
        entityType: 'sell',
        apiService: this.service.dataService
      },
      width: '80rem'
    };
  }

}
