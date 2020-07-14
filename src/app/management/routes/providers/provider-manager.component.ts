import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Provider } from 'src/data/models/entities/Provider';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { DataManagerAbstractComponent } from '../../data-manager.abstract-component';
import { ProviderManagerFormDialogComponent, ProviderManagerFormDialogData } from './form-dialog/provider-manager-form-dialog.component';
import { ProviderManagerService } from './provider-manager.service';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: [ '../../data-manager.styles.css' ]
})
export class ProviderManagerComponent
extends DataManagerAbstractComponent<Provider> {

  public tableColumns: string[] = [ 'name', 'idCard', 'actions' ];

  constructor(
    protected service: ProviderManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: Provider): Observable<Provider> {
    const dialogData: ProviderManagerFormDialogData = {
      provider: item
    };

    return this.dialogService.open(
      ProviderManagerFormDialogComponent, {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(p: Provider) {
    this.service.removeItems([p]).pipe(r => r[0]).subscribe(
      (success: boolean) => {
        if (success) {
          this.snackBarService.open('Proveedor \'' + p.person.name + '\' eliminado.');
          this.service.reloadItems();
        } else {
          this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
       }
    );
  }

}
