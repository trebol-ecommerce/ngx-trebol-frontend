import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Sell } from 'src/data/models/entities/Sell';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerAbstractComponent } from '../../data-manager.abstract-component';
import { SaleManagerFormDialogData, SellManagerFormDialogComponent } from './form-dialog/sell-manager-form-dialog.component';
import { SellManagerService } from './sell-manager.service';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: [ '../../data-manager.styles.css' ]
})
export class SellManagerComponent
  extends DataManagerAbstractComponent<Sell> {

  public tableColumns: string[] = [ 'id', 'date', 'actions' ];

  constructor(
    protected service: SellManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: Sell): Observable<Sell> {
    const dialogData: SaleManagerFormDialogData = { sell: item };

    return this.dialogService.open(
      SellManagerFormDialogComponent,
      {
        width: '80rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(vnt: Sell) {
    this.service.removeItems([vnt]).pipe(r => r[0]).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Venta N°' + vnt.id + ' (' + vnt.soldOn + ') eliminada.');
          this.service.reloadItems();
        } else {
          this.snackBarService.open('Hubo un problema al borrar la venta.');
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
       }
    );
  }

}
