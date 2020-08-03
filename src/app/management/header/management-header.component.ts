import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EditProfileFormDialogComponent } from 'src/app/shared/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent {

  public moduleName$: Observable<string>;

  public appName = 'New Bazaar';
  public userName = 'Invitado';

  constructor(
    protected service: ManagementService,
    protected appUserService: AppUserService,
    protected dialogService: MatDialog,
    protected router: Router,
    protected snackBarService: MatSnackBar
  ) {
    this.moduleName$ = this.service.currentPageName$.pipe();
  }

  public switchSidenavOpenState(): void {
    this.service.switchSidenav();
  }


  public onClickEditProfile(): void {
    this.dialogService.open(
      EditProfileFormDialogComponent,
      {
        width: '40rem',
      }
    );
  }

  protected promptLogoutConfirmation(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      title: '¿Cerrar sesion?',
      message: 'Si esta realizando una transaccion, perdera la informacion que no haya guardado.'
    };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  public onClickLogout(): void {
    this.promptLogoutConfirmation().subscribe(
      confirmado => {
        if (confirmado) {
          this.appUserService.closeCurrentSession();
          this.router.navigateByUrl('/');
          this.snackBarService.open('Sesión cerrada con éxito.', 'OK');
        }
      }
    );
  }

}
