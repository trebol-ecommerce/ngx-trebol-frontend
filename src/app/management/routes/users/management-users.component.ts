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
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/models/entities/User';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager/transactional-data-manager.component.directive';
import { ManagementUsersService } from './management-users.service';

@Component({
  selector: 'app-management-users',
  templateUrl: './management-users.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './management-users.component.css'
  ]
})
export class ManagementUsersComponent
  extends TransactionalDataManagerComponentDirective<User>
  implements OnInit {

  tableColumns = [ 'name', 'role', 'actions' ];

  constructor(
    protected service: ManagementUsersService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    private snackBarService: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
  }

  onClickDelete(usr: User) {
    this.service.removeItems([usr]).pipe(
      map(results => results[0]),
      catchError(error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        return of(error);
      }),
      tap(() => {
        const successMessage = $localize`:Message of success after deleting an user with name {{ username }}:User ${usr.name}:username: deleted`;
        this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        this.service.reloadItems();
      })
    ).subscribe();
  }

  protected createDialogProperties(item: User): EntityFormDialogConfig<User> {
    return {
      data: {
        item,
        entityType: 'user',
        apiService: this.service.dataService
      },
      width: '40rem'
    };
  }

}
