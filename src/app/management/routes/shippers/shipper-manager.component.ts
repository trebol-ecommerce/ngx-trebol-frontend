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
import { Shipper } from 'src/app/models/entities/Shipper';
import { ShipperFormComponent } from 'src/app/shared/components/shipper-form/shipper-form.component';
import { COMMON_WARNING_MESSAGE, COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogConfig } from '../../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';
import { ShipperManagerService } from './shipper-manager.service';

@Component({
  selector: 'app-shipper-manager',
  templateUrl: './shipper-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './shipper-manager.component.css'
  ]
})
export class ShipperManagerComponent
  extends TransactionalDataManagerComponentDirective<Shipper>
  implements OnInit {

  tableColumns: string[] = [ 'name', 'actions' ];

  constructor(
    protected service: ShipperManagerService,
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

  protected createDialogProperties(item: Shipper): DataManagerFormDialogConfig<Shipper> {
    return {
      data: {
        item,
        formComponent: ShipperFormComponent,
        service: this.service.dataService
      },
      width: '40rem'
    };
  }

  onClickDelete(shipper: Shipper) {
    this.service.removeItems([shipper]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          const successMessage = $localize`:Message of success after deleting a shipper with name {{ name }}:Shipper '${shipper.name}:name:' deleted`;
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
