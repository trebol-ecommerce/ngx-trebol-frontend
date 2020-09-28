import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Sell } from 'src/app/data/models/entities/Sell';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { SaleManagerFormDialogData, SellManagerFormDialogComponent } from './form-dialog/sell-manager-form-dialog.component';
import { SellManagerService } from './sell-manager.service';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './sell-manager.component.css'
  ]
})
export class SellManagerComponent
  extends DataManagerComponent<Sell>
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
    this.route.data.subscribe(
      d => {
        this.service.updateAccess(d.access);
        this.service.reloadItems();
      }
    );
  }

  public openFormDialog(sell: Sell): Observable<Sell> {
    const dialogData: SaleManagerFormDialogData = { sell };

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
