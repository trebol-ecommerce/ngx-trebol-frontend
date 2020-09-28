import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { User } from 'src/app/data/models/entities/User';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerComponent } from '../data-manager.acomponent';
import { UserManagerFormDialogComponent, UserManagerFormDialogData } from './form-dialog/user-manager-form-dialog.component';
import { UserManagerService } from './user-manager.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: [
    '../data-manager.styles.css',
    './user-manager.component.css'
  ]
})
export class UserManagerComponent
  extends DataManagerComponent<User>
  implements OnInit {

  public tableColumns: string[] = [ 'name', 'creationDate', 'fullName', 'actions' ];

  constructor(
    protected service: UserManagerService,
    protected dialogService: MatDialog,
    protected snackBarService: MatSnackBar,
    protected route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.items$ = concat(
      this.route.data.pipe(pluck('items')),
      this.service.items$.pipe()
    );
    this.route.data.subscribe(
      d => { this.service.updateAccess(d.access); }
    );
  }

  public openFormDialog(user: User): Observable<User> {
    const dialogData: UserManagerFormDialogData = { user };

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
      success => {
        if (success) {
          this.snackBarService.open(`Usuario ${usr.name} eliminado`, 'OK');
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
