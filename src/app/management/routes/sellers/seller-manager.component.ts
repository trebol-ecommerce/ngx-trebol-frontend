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
import { Seller } from 'src/app/models/entities/Seller';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { SellerManagerService } from './seller-manager.service';
import { SellerManagementFormDialogData, SellerManagerFormDialogComponent } from './form-dialog/seller-manager-form-dialog.component';

@Component({
  selector: 'app-seller-manager',
  templateUrl: './seller-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './seller-manager.component.css'
  ]
})
export class SellerManagerComponent
  extends DataManagerComponent<Seller>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'idCard', 'actions' ];

  constructor(
    protected service: SellerManagerService,
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

  public openFormDialog(seller: Seller): Observable<Seller> {
    const dialogData: SellerManagementFormDialogData = { seller };

    return this.dialogService.open(
      SellerManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(e: Seller) {
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
