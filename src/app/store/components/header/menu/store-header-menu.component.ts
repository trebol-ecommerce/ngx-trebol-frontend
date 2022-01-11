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
import { filter, mapTo, pluck, startWith, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { EditProfileFormDialogComponent } from 'src/app/shared/dialogs/edit-profile-form/edit-profile-form-dialog.component';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';

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
    private dialogService: MatDialog,
    private sharedDialogService: SharedDialogService
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
      this.sharedDialogService.requestConfirmation({
        title: $localize`:Title of dialog prompt for logging out:Log out?`,
        message: $localize`:Label to hint user that any undergoing process may be lost when logging out:Any unsaved data may be lost`
      }).pipe(
        filter(didConfirm => didConfirm),
        tap(() => {
          this.appService.closeCurrentSession();
          const message = $localize`:Message after logging out:You have logged out`;
          this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
        })
      ).subscribe();
    }
  }

}
