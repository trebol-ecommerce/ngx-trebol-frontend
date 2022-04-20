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
import { Salesperson } from 'src/models/entities/Salesperson';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementSalespeopleService } from './management-salespeople.service';

@Component({
  selector: 'app-management-salespeople',
  templateUrl: './management-salespeople.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-salespeople.component.css'
  ]
})
export class ManagementSalespeopleComponent
  extends TransactionalDataManagerComponentDirective<Salesperson>
  implements OnInit, OnDestroy {

  private actionSubscription: Subscription;

  tableColumns = [ 'name', 'idNumber', 'actions' ];

  constructor(
    protected service: ManagementSalespeopleService,
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

  onClickDelete(e: Salesperson) {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.service.removeItems([e]).pipe(
      switchMap(() => this.service.reloadItems()),
      tap(
        () => {
          const successMessage = $localize`:Message of success after deleting a salesperson with first name {{ firstName }} and last name {{ lastName }}:Salesperson ${e.person.firstName}:firstName: ${e.person.lastName}:lastName: deleted`;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        },
        () => {
          this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      )
    ).subscribe();
  }

  protected createDialogProperties(item: Salesperson): EntityFormDialogConfig<Salesperson> {
    return {
      data: {
        isNewItem: !item,
        item,
        entityType: 'person',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

}
