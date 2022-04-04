/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { ProfileService } from 'src/app/profile.service';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { passwordMatcher } from 'src/functions/passwordMatcher';
import { Person } from 'src/models/entities/Person';
import { Registration } from 'src/models/Registration';
import { COMMON_DISMISS_BUTTON_LABEL } from 'src/text/messages';

/**
 * Account registration form dialog.
 *
 * afterClosed() emits true only if the registration is succesful
 */
@Component({
  selector: 'app-store-registration-form-dialog',
  templateUrl: './store-registration-form-dialog.component.html',
  styleUrls: ['./store-registration-form-dialog.component.css']
})
export class StoreRegistrationFormDialogComponent
  implements OnDestroy {

  private registeringSource = new BehaviorSubject(false);

  registering$ = this.registeringSource.asObservable();

  formGroup: FormGroup;
  get name() { return this.formGroup.get('name') as FormControl; }
  get pass1() { return this.formGroup.get('pass1') as FormControl; }
  get pass2() { return this.formGroup.get('pass2') as FormControl; }
  get person() { return this.formGroup.get('person') as FormGroup; }

  constructor(
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<StoreRegistrationFormDialogComponent>,
    private snackBarService: MatSnackBar,
    private entityFormGroupService: EntityFormGroupFactoryService
  ) {
    this.formGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        person: this.entityFormGroupService.createFormGroupFor('person')
      },
      { validators: passwordMatcher }
    );
  }

  ngOnDestroy(): void {
    this.registeringSource.complete();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.registeringSource.next(true);
      const details: Registration = {
        name: this.name.value,
        password: this.pass1.value,
        profile: this.person.value as Person
      };
      this.authenticationService.register(details).pipe(
        takeUntil(this.authenticationService.authCancelation$),
        tap(() => {
          const successMessage = $localize`:Message of success after registration:Registration was succesful. Please remember to keep your password safe, and enjoy shopping!`;
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
          this.dialog.close(true);
        }),
        catchError(err => {
          const errorMessage = $localize`:Message of error during registration, hint user to try again:There was an error during registration. Please try again.`;
          this.snackBarService.open(errorMessage, COMMON_DISMISS_BUTTON_LABEL);
          this.registeringSource.next(false);
          return throwError(err);
        }),
        switchMap(() => this.profileService.getUserProfile())
      ).subscribe();
    }
  }

  onCancel(): void {
    this.authenticationService.cancelAuthentication();
    this.dialog.close();
  }
}
