/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { ManagementService } from 'src/app/management/management.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from 'src/app/shared/dialogs/confirmation-dialog/ConfirmationDialogData';
import { EditProfileFormDialogComponent } from 'src/app/shared/dialogs/edit-profile-form-dialog/edit-profile-form-dialog.component';
import { environment } from 'src/environments/environment';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent {

  moduleName$: Observable<string>;
  userName$: Observable<string>;

  readonly appTitle = environment.labels.name;

  constructor(
    protected service: ManagementService,
    protected appService: AppService,
    protected dialogService: MatDialog,
    protected router: Router,
    protected snackBarService: MatSnackBar
  ) {
    this.moduleName$ = this.service.currentPageName$.pipe();
    this.userName$ = this.appService.getUserProfile().pipe(pluck('name'));
  }

  switchSidenavOpenState(): void {
    this.service.switchSidenav();
  }

  onClickEditProfile(): void {
    this.dialogService.open(
      EditProfileFormDialogComponent,
      {
        width: '40rem',
      }
    );
  }

  onClickLogout(): void {
    this.promptLogoutConfirmation().subscribe(
      confirmed => {
        if (confirmed) {
          this.appService.closeCurrentSession();
          this.router.navigateByUrl('/');
          const message = $localize`:logout message|Label to notify user that they have logged out:You have logged out`;
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
        }
      }
    );
  }

  private promptLogoutConfirmation(): Observable<boolean> {
    const dialogData: ConfirmationDialogData = {
      title: 'Terminar sesión',
      message: '¿Está segur@?'
    };

    return this.dialogService.open(
      ConfirmationDialogComponent,
      {
        width: '24rem',
        data: dialogData
      }
    ).afterClosed();
  }

}
