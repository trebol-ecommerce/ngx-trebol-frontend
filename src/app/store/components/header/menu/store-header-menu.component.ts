/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization.service';
import { ProfileService } from 'src/app/profile.service';
import { SessionService } from 'src/app/session.service';
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
    private authorizationService: AuthorizationService,
    private sessionService: SessionService,
    private profileService: ProfileService,
    private snackBarService: MatSnackBar,
    private dialogService: MatDialog,
    private sharedDialogService: SharedDialogService
  ) { }

  ngOnInit(): void {
    this.userName$ = this.profileService.userName$.pipe();
    this.canNavigateManagement$ = this.sessionService.userHasActiveSession$.pipe(
      switchMap(hasActiveSession => (!hasActiveSession ?
        of(false) :
        this.authorizationService.getAuthorizedAccess().pipe(
          map(access => (access?.routes?.length > 0))
        )
      ))
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
    this.sessionService.userHasActiveSession$.pipe(
      take(1),
      filter(hasActiveSession => hasActiveSession),
      switchMap(() => this.confirmLogout()),
      filter(didConfirm => didConfirm),
      tap(() => {
        this.sessionService.closeCurrentSession();
        const message = $localize`:Message after logging out:You have logged out`;
        this.snackBarService.open(message, COMMON_DISMISS_BUTTON_LABEL);
      })
    ).subscribe();
  }

  private confirmLogout(): Observable<boolean> {
    return this.sharedDialogService.requestConfirmation({
      title: $localize`:Title of dialog prompt for logging out:Log out?`,
      message: $localize`:Label to hint user that any undergoing process may be lost when logging out:Any unsaved data may be lost`
    });
  }

}
