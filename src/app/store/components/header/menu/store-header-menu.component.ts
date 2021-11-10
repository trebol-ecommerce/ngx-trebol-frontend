/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { mapTo, pluck, startWith, switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from 'src/app/shared/dialogs/confirmation-dialog/ConfirmationDialogData';
import { EditProfileFormDialogComponent } from 'src/app/shared/dialogs/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { LOGOUT_MESSAGE } from 'src/text/messages';

@Component({
  selector: 'app-store-header-menu',
  templateUrl: './store-header-menu.component.html',
  styleUrls: ['./store-header-menu.component.css']
})
export class StoreHeaderMenuComponent
  implements OnInit {

  userName$: Observable<string>;
  canNavigateManagement$: Observable<boolean>;

  constructor(
    private appService: AppService,
    private snackBarService: MatSnackBar,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {

    this.userName$ = this.appService.isLoggedInChanges$.pipe(
      startWith(this.appService.isLoggedIn()),
      switchMap(
        (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            return of('');
          } else {
            return this.appService.getUserProfile().pipe(pluck('firstName'));
          }
        }
      )
    );

    this.canNavigateManagement$ = this.appService.isLoggedInChanges$.pipe(
      startWith(this.appService.isLoggedIn()),
      switchMap(
        (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            return of(false);
          } else {
            return this.appService.getAuthorizedAccess().pipe(mapTo(true));
          }
        }
      )
    );
  }

  onClickEditProfile(): void {
    this.dialogService.open(
      EditProfileFormDialogComponent,
      {
        width: '60rem'
      }
    );
  }

  onClickLogout(): void {
    if (this.appService.isLoggedIn()) {
      this.promptLogoutConfirmation().subscribe(
        confirmed => {
          if (confirmed) {
            this.appService.closeCurrentSession();
            this.snackBarService.open(LOGOUT_MESSAGE, 'OK');
          }
        }
      );
    }
  }

  private promptLogoutConfirmation(): Observable<boolean> {
    const title = $localize`:Label for asking user to confirm log out:¿Cerrar sesión?`;
    const message = $localize`:Label for hinting users that any undergoing process may be lost when logging out:Si está realizando una transaccion, perderá la informacion que haya guardado.`;
    const dialogData: ConfirmationDialogData = { title, message };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

}
