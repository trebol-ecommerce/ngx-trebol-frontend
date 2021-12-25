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
import { Sell } from 'src/models/entities/Sell';
import { SellFormComponent } from 'src/app/shared/components/sell-form/sell-form.component';
import { COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { EntityFormDialogConfig } from '../../../shared/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
import { ManagementSalesService } from './management-sales.service';

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

  tableColumns = [ 'id', 'date', 'customerName', 'status', 'actions' ];

  constructor(
    protected service: ManagementSalesService,
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

  onClickDelete(s: Sell) {
    this.service.removeItems([s]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const message = $localize`:Message of success after deleting a sell with buy order {{ buyOrder }} on date {{ date }}:Sell N°${s.buyOrder}:buyOrder: (${s.date}:date:) deleted`;
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
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

  protected createDialogProperties(item: Sell): EntityFormDialogConfig<Sell> {
    return {
      data: {
        item,
        formComponent: SellFormComponent,
        service: this.service.dataService
      },
      width: '80rem'
    };
  }

}
