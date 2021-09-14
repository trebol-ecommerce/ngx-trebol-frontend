// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { SellFormComponent } from 'src/app/shared/components/sell-form/sell-form.component';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormDialogConfig } from '../../dialogs/data-manager-form-dialog/DataManagerFormDialogConfig';
import { SellManagerService } from './sell-manager.service';
import { TransactionalDataManagerComponentDirective } from '../../directives/transactional-data-manager.component-directive';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './sell-manager.component.css'
  ]
})
export class SellManagerComponent
  extends TransactionalDataManagerComponentDirective<Sell>
  implements OnInit {

  public tableColumns: string[] = [ 'id', 'date', 'actions' ];

  constructor(
    protected service: SellManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar,
    protected route: ActivatedRoute
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

  protected createDialogProperties(item: Sell): DataManagerFormDialogConfig<Sell> {
    return {
      data: {
        item,
        formComponent: SellFormComponent,
        service: this.service.dataService
      },
      width: '80rem'
    };
  }

  onClickDelete(s: Sell) {
    this.service.removeItems([s]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Venta N°${s.id} (${s.soldOn}) eliminada`);
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
        }
      },
      error => {
        this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
      }
    );
  }

}
