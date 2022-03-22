/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SalespersonFormComponent } from 'src/app/shared/components/salesperson-form/salesperson-form.component';
import { Salesperson } from 'src/models/entities/Salesperson';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
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
  implements OnInit {

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
    super.init(this.service);
  }

  onClickDelete(e: Salesperson) {
    this.service.removeItems([e]).pipe(
      map(results => results[0]),
      catchError(error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return of(error);
      }),
      tap(() => {
        const successMessage = $localize`:Message of success after deleting a salesperson with first name {{ firstName }} and last name {{ lastName }}:Salesperson ${e.person.firstName}:firstName: ${e.person.lastName}:lastName: deleted`;
        this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        this.service.reloadItems();
      })
    ).subscribe();
  }

  protected createDialogProperties(item: Salesperson): EntityFormDialogConfig<Salesperson> {
    return {
      data: {
        item,
        entityType: 'person',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

}
