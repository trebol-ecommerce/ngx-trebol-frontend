// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/app/models/entities/Sell';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
import { SellManagerFormDialogComponent } from './form-dialog/sell-manager-form-dialog.component';
import { SellManagerService } from './sell-manager.service';
import { DataManagerFormDialogData } from '../DataManagerFormDialogData';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './sell-manager.component.css'
  ]
})
export class SellManagerComponent
  extends DataManagerComponentDirective<Sell>
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

  public openFormDialog(item: Sell): Observable<Sell> {
    const dialogData: DataManagerFormDialogData<Sell> = { item };

    return this.dialogService.open(
      SellManagerFormDialogComponent,
      {
        width: '80rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(s: Sell) {
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
