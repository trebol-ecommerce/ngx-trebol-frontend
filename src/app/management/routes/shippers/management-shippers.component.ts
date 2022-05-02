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
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Shipper } from 'src/models/entities/Shipper';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementShippersService } from './management-shippers.service';

@Component({
  selector: 'app-management-shippers',
  templateUrl: './management-shippers.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-shippers.component.css'
  ]
})
export class ManagementShippersComponent
  extends TransactionalDataManagerComponentDirective<Shipper>
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;

  tableColumns = [ 'name', 'actions' ];

  constructor(
    protected service: ManagementShippersService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.actionSubscription?.unsubscribe();
  }

  onClickDelete(shipper: Shipper) {
    this.actionSubscription?.unsubscribe();
    this.service.removeItems([shipper]).pipe(
      switchMap(() => this.service.reloadItems()),
      tap(
        () => {
          const successMessage = $localize`:Message of success after deleting a shipper with name {{ name }}:Shipper '${shipper.name}:name:' deleted`;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        },
        () => {
          this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  protected createDialogProperties(item: Shipper): EntityFormDialogConfig<Shipper> {
    return {
      data: {
        isNewItem: !item,
        item,
        entityType: 'shipper',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

}
