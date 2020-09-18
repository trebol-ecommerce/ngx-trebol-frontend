import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map, pluck, startWith } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { APP_INITIALS_TITLE, APP_LONG_TITLE } from 'src/app/app.constants';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EditProfileFormDialogComponent } from 'src/app/shared/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { EmployeeRolesEnum } from 'src/app/data/enums/EmployeeRolesEnum';
import { StoreCompanyDetailsDialogComponent } from '../dialogs/company-details/store-company-details-dialog.component';
import { StoreLoginFormDialogComponent } from '../dialogs/login-form/store-login-form-dialog.component';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent
  implements OnInit {

  public cartHasItems$: Observable<boolean>;
  public itemQuantityLabel$: Observable<string>;
  public cartSubtotalValue$: Observable<number>;
  public isLoggedIn$: Observable<boolean>;

  public readonly desktopTitle: string = APP_LONG_TITLE;
  public readonly mobileTitle: string = APP_INITIALS_TITLE;

  public userName$: Observable<string>;

  constructor(
    protected storeService: StoreService,
    protected appService: AppService,
    protected snackBarService: MatSnackBar,
    protected dialogService: MatDialog,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.storeService.sellDetails$.pipe(
      map(array => array.length > 0)
    );

    this.itemQuantityLabel$ = this.storeService.itemQuantity$.pipe(
      map(total => total + ' item' + (total > 1 ? 's' : ''))
    );

    this.userName$ = this.appService.isLoggedInChanges$.pipe(
      concatMap(
        (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            return '';
          } else {
            return this.appService.getUserProfile().pipe(pluck('name'));
          }
        }
      )
    );

    this.cartSubtotalValue$ = this.storeService.sellSubtotalValue$.pipe();

    this.isLoggedIn$ = this.appService.isLoggedInChanges$.pipe();
  }

  protected promptLogoutConfirmation(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      title: '¿Cerrar sesion?',
      message: 'Si esta realizando una transaccion, perdera la informacion que haya guardado.'
    };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

  protected promptManagementRedirect(): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Ha ingresado como administrador',
      message: '¿Desea ingresar al portal de gestión?'
    };
    this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed().subscribe(
      (resp: boolean) => {
        if (resp) {
          this.router.navigateByUrl('/management');
        }
      }
    );
  }

  public onClickViewCompanyDetails(): void {
    this.dialogService.open(
      StoreCompanyDetailsDialogComponent
    );
  }

  public onClickLogIn(): void {
    this.dialogService.open(
      StoreLoginFormDialogComponent,
      { width: '24rem' }
    ).afterClosed().subscribe();
    // TODO reimplement this somehow?
    //   () => {
    //     const ssn = this.appService.isUserLoggedIn();
    //     if (ssn.user?.employee?.role.id === EmployeeRolesEnum.Administrador) {
    //       this.promptManagementRedirect();
    //     }
    //   }
    // );
  }

  public onClickEditProfile(): void {
    this.dialogService.open(
      EditProfileFormDialogComponent,
      { width: '60rem' }
    );
  }

  public onClickLogout(): void {
    this.promptLogoutConfirmation().subscribe(
      (confirmed: boolean) => {
        if (confirmed) {
          this.appService.closeCurrentSession();
          this.snackBarService.open('Su sesión ha sido cerrada.');
        }
      }
    );
  }

}
