import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { User } from 'src/app/data/models/entities/User';
import { UserManagerFormDialogComponent, UserManagerFormDialogData } from './form-dialog/user-manager-form-dialog.component';
import { UserManagerService } from './user-manager.service';
import { DataManagerComponent } from '../data-manager.acomponent';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './user-manager.component.css'
  ]
})
export class UserManagerComponent
  extends DataManagerComponent<User> {

  public tableColumns: string[] = [ 'name', 'creationDate', 'fullName', 'actions' ];

  constructor(
    protected service: UserManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar
  ) {
    super();
  }

  public openFormDialog(item: User): Observable<User> {
    const dialogData: UserManagerFormDialogData = {
      usuario: item
    };

    return this.dialogService.open(
      UserManagerFormDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickDelete(usr: User) {
    this.service.removeItems([usr]).pipe(
      map(results => results[0])
    ).subscribe(
      (exito: boolean) => {
        if (exito) {
          this.snackBarService.open(`Usuario ${usr.name} eliminado`, 'OK');
          this.service.reloadItems();
        } else {
          this.snackBarService.open('Hubo un problema al borrar el empleado.');
        }
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
       }
    );
  }

}
