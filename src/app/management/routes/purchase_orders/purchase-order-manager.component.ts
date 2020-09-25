import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import {
  PurchaseOrderManagerFormDialogComponent,
  PurchaseOrderManagerFormDialogData
} from './form-dialog/purchase-order-manager-form-dialog.component';
import { PurchaseOrderManagerService } from './purchase-order-manager.service';

@Component({
  selector: 'app-purchase-order-manager',
  templateUrl: './purchase-order-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
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
    this.service.removeItems([oc]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Orden de compra N°${oc.id} eliminada`, 'OK');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
        }
      },
      () => {
        this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
       }
    );
  }

}
