/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/profile.service';
import { SessionService } from 'src/app/session.service';
import { EditProfileFormDialogComponent } from 'src/app/shared/dialogs/edit-profile-form/edit-profile-form-dialog.component';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';

@Component({
  selector: 'app-management-header-menu',
  templateUrl: './management-header-menu.component.html',
  styleUrls: ['./management-header-menu.component.css']
})
export class ManagementHeaderMenuComponent
  implements OnInit {

  userName$: Observable<string>;

  constructor(
    protected sessionService: SessionService,
    protected profileService: ProfileService,
    protected dialogService: MatDialog,
    protected sharedDialogService: SharedDialogService,
    protected router: Router,
    protected snackBarService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userName$ = this.profileService.userName$.pipe();
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
    this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt for logging out:Log out?`,
      message: $localize`:Label to hint user that any undergoing process may be lost when logging out:Any unsaved data may be lost`
    }).pipe(
      filter(didConfirm => didConfirm),
      tap(() => {
        this.sessionService.closeCurrentSession();
        this.router.navigateByUrl('/');
        const message = $localize`:Message after logging out:You have logged out`;
        this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
      })
    ).subscribe();
  }

}
