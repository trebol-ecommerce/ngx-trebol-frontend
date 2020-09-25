import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Provider } from 'src/app/data/models/entities/Provider';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { ProviderManagerFormDialogComponent, ProviderManagerFormDialogData } from './form-dialog/provider-manager-form-dialog.component';
import { ProviderManagerService } from './provider-manager.service';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './provider-manager.component.css'
  ]
})
export class ProviderManagerComponent
extends DataManagerComponent<Provider> {

  public tableColumns: string[] = [ 'name', 'idCard', 'actions' ];

  constructor(
    protected service: ProviderManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(provider: Provider): Observable<Provider> {
    const dialogData: ProviderManagerFormDialogData = { provider };

    return this.dialogService.open(
      ProviderManagerFormDialogComponent, {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(p: Provider) {
    this.service.removeItems([p]).pipe(
      map(results => results[0])
    ).subscribe(
      success => {
        if (success) {
          this.snackBarService.open(`Proveedor ${p.person.name} eliminado`, 'OK');
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
