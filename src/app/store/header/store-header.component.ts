import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { TITLE } from 'src/app/app.component';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { Person } from 'src/data/models/entities/Person';
import { SessionDataIService } from 'src/data/services/auth.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { EmployeeRolesEnum } from 'src/data/enums/EmployeeRolesEnum';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { EditProfileFormDialogComponent } from '../../shared/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { StoreLoginFormDialogComponent } from '../login-form-dialog/store-login-form-dialog.component';
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

  public title: string = TITLE;
  public userName$: Observable<string>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.sessions) protected authDataService: SessionDataIService,
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>,
    protected service: StoreService,
    protected appUserService: AppUserService,
    protected snackBarService: MatSnackBar,
    protected dialogService: MatDialog,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.cartHasItems$ = this.service.sellDetails$.pipe(
      map(array => array.length > 0)
    );

    this.itemQuantityLabel$ = this.service.itemQuantity$.pipe(
      map(total => total + ' item' + (total > 1 ? 's' : ''))
    );

    this.userName$ = this.appUserService.sessionChanges$.pipe(
      map(session => {
        if (!(session && session.user?.name)) {
          return '';
        } else {
          return session.user.name;
        }
      })
    );

    this.cartSubtotalValue$ = this.service.sellSubtotalValue$.pipe();

    this.isLoggedIn$ = this.appUserService.sessionChanges$.pipe(map(s => !!(s && s.user)));
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

  public onClickLogIn(): void {
    this.dialogService.open(
      StoreLoginFormDialogComponent,
      { width: '24rem' }
    ).afterClosed().subscribe(
      () => {
        const ssn = this.appUserService.getCurrentSession();
        if (ssn.user?.employee?.role.id === EmployeeRolesEnum.Administrador) {
          this.promptManagementRedirect();
        }
      }
    );
  }

  public onClickEditProfile(): void {
    const sesion = this.appUserService.getCurrentSession();
    this.peopleDataService.readById(sesion.user.person.id).subscribe(
      () => {
        this.dialogService.open(
          EditProfileFormDialogComponent,
          { width: '60rem' }
        );
      },
      () => {
        this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
      }
    );
  }

  public onClickLogout(): void {
    this.promptLogoutConfirmation().subscribe(
      (confirmed: boolean) => {
        if (confirmed) {
          this.appUserService.closeCurrentSession();
          this.snackBarService.open('Su sesión ha sido cerrada.');
        }
      }
    );
  }

}
