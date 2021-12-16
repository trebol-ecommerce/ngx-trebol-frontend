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
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { SalespersonFormComponent } from 'src/app/shared/components/salesperson-form/salesperson-form.component';
import { COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
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

  tableColumns: string[] = [ 'name', 'idNumber', 'actions' ];

  constructor(
    protected service: ManagementSalespeopleService,
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

  protected createDialogProperties(item: Salesperson): EntityFormDialogConfig<Salesperson> {
    return {
      data: {
        item,
        formComponent: SalespersonFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(e: Salesperson) {
    this.service.removeItems([e]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const successMessage = $localize`:Message of success after deleting a salesperson with first name {{ firstName }} and last name {{ lastName }}:Salesperson ${e.person.firstName}:firstName: ${e.person.lastName}:lastName: deleted`;
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
