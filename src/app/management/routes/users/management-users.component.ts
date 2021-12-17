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
import { map } from 'rxjs/operators';
import { User } from 'src/models/entities/User';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';
import { COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
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

  tableColumns: string[] = [ 'name', 'role', 'actions' ];

  constructor(
    protected service: ManagementUsersService,
    protected dialogService: MatDialog,
    private snackBarService: MatSnackBar,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    super.init(this.service);
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
  }

  protected createDialogProperties(item: User): EntityFormDialogConfig<User> {
    return {
      data: {
        item,
        formComponent: UserFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(usr: User) {
    this.service.removeItems([usr]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const successMessage = $localize`:Message of success after deleting an user with name {{ username }}:User ${usr.name}:username: deleted`;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
        }
      },
      error => {
        this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
      }
    );
  }

}