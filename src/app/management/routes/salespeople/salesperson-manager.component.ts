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
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponentDirective } from '../data-manager.component-directive';
import { SalespersonManagerService } from './salesperson-manager.service';
import { SalespersonManagerFormDialogComponent } from './form-dialog/salesperson-manager-form-dialog.component';
import { DataManagerFormDialogData } from '../DataManagerFormDialogData';

@Component({
  selector: 'app-salesperson-manager',
  templateUrl: './salesperson-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './salesperson-manager.component.css'
  ]
})
export class SalespersonManagerComponent
  extends DataManagerComponentDirective<Salesperson>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'idNumber', 'actions' ];

  constructor(
    protected service: SalespersonManagerService,
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

  public openFormDialog(item: Salesperson): Observable<Salesperson> {
    const dialogData: DataManagerFormDialogData<Salesperson> = { item };

    return this.dialogService.open(
      SalespersonManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(e: Salesperson) {
    this.service.removeItems([e]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Empleado ${e.person.name} eliminado.`, 'OK');
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
