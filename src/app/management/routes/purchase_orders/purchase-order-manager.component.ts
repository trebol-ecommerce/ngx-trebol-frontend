import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerComponent } from '../../data-manager.acomponent';
import {
  PurchaseOrderManagerFormDialogComponent,
  PurchaseOrderManagerFormDialogData
} from './form-dialog/purchase-order-manager-form-dialog.component';
import { PurchaseOrderManagerService } from './purchase-order-manager.service';

@Component({
  selector: 'app-purchase-order-manager',
  templateUrl: './purchase-order-manager.component.html',
  styleUrls: [
    '../../data-manager.styles.css',
    './purchase-order-manager.component.css'
  ]
})
export class PurchaseOrderManagerComponent
  extends DataManagerComponent<PurchaseOrder> {

  public tableColumns: string[] = [ 'id', 'orderDate', 'receiptDate', 'actions' ];

  constructor(
    protected service: PurchaseOrderManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: PurchaseOrder): Observable<PurchaseOrder> {
    const dialogData: PurchaseOrderManagerFormDialogData = {
      purchaseOrder: item
    };

    return this.dialogService.open(
      PurchaseOrderManagerFormDialogComponent,
      {
        width: '80rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(oc: PurchaseOrder) {
    this.service.removeItems([oc]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Orden de compra eliminada.');
          this.service.reloadItems();
        } else {
          this.snackBarService.open('Hubo un problema al borrar la orden de compra.');
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
       }
    );
  }

}
