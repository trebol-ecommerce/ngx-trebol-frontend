import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Sell } from 'src/data/models/entities/Sell';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { SaleManagerFormDialogData, SellManagerFormDialogComponent } from './form-dialog/sell-manager-form-dialog.component';
import { SellManagerService } from './sell-manager.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: [
    '../../data-manager.styles.css',
    './sell-manager.component.css'
  ]
})
export class SellManagerComponent
  extends DataManagerComponent<Sell> {

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

  public onClickDelete(s: Sell) {
    this.service.removeItems([s]).pipe(
      map(results => results[0])
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open('Venta N°' + s.id + ' (' + s.soldOn + ') eliminada.');
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
