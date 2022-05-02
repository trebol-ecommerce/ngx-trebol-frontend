/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ProfileService } from 'src/app/profile.service';
import { Person } from 'src/models/entities/Person';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE, COMMON_WARNING_MESSAGE } from 'src/text/messages';

@Component({
  selector: 'app-edit-profile-form-dialog',
  templateUrl: './edit-profile-form-dialog.component.html',
  styleUrls: ['./edit-profile-form-dialog.component.css']
})
export class EditProfileFormDialogComponent
  implements OnInit, OnDestroy {

  private savingSource = new BehaviorSubject(false);
  private loadFormSub: Subscription;
  private sendFormSub: Subscription;

  saving$ = this.savingSource.asObservable();
  cancelButtonColor$: Observable<string>;

  formGroup: FormGroup;
  get profile() { return this.formGroup.get('profile') as FormControl; }

  constructor(
    private dialog: MatDialogRef<EditProfileFormDialogComponent>,
    private snackBarService: MatSnackBar,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      profile: new FormControl({ value: null }, Validators.required)
    });
    this.loadFormSub = this.profileService.getUserProfile().pipe(
      tap(profile => this.formGroup.setValue({ profile }))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
    this.loadFormSub?.unsubscribe();
    this.sendFormSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.profile.value as Person;
      this.sendFormSub?.unsubscribe();
      this.sendFormSub = this.profileService.updateUserProfile(formValue).pipe(
        tap(
          () => {
            const succesfulSaveMessage = $localize`:succesful profile edit|Message of success after editing profile information:Your profile information has been saved`;
            this.snackBarService.open(succesfulSaveMessage, COMMON_DISMISS_BUTTON_LABEL);
            this.dialog.close();
          },
          () => {
            this.snackBarService.open(COMMON_ERROR_MESSAGE , COMMON_DISMISS_BUTTON_LABEL);
          }
        )
      ).subscribe();
    }
  }
}
