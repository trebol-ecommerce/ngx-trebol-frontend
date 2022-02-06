/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Login } from 'src/models/Login';
import { DialogSwitcherButtonComponent } from 'src/app/shared/components/dialog-switcher-button/dialog-switcher-button.component';
import { COMMON_DISMISS_BUTTON_LABEL, COMMON_ERROR_MESSAGE } from 'src/text/messages';
import { StoreRegistrationFormDialogComponent } from '../registration-form/store-registration-form-dialog.component';

@Component({
  selector: 'app-store-login-form-dialog',
  templateUrl: './store-login-form-dialog.component.html',
  styleUrls: ['./store-login-form-dialog.component.css']
})
export class StoreLoginFormDialogComponent
  implements OnInit {

  private loggingInSource = new Subject();
  private hidePasswordSource = new BehaviorSubject(true);

  loggingIn$ = this.loggingInSource.asObservable();

  togglePasswordIcon$: Observable<string>;
  passwordInputType$: Observable<string>;

  formGroup: FormGroup;
  get username(): FormControl { return this.formGroup.get('username') as FormControl; }
  get password(): FormControl { return this.formGroup.get('password') as FormControl; }

  @ViewChild('registerButton', { static: true }) registerButton: DialogSwitcherButtonComponent;

  constructor(
    private dialog: MatDialogRef<StoreLoginFormDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBarService: MatSnackBar,
    private appService: AppService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.togglePasswordIcon$ = this.hidePasswordSource.asObservable().pipe(map(hide => (hide ? 'visibility' : 'visibility_off')));
    this.passwordInputType$ = this.hidePasswordSource.asObservable().pipe(map(hide => (hide ? 'password' : 'text')));
  }

  ngOnInit(): void {
    this.registerButton.sourceDialogRef = this.dialog;
    this.registerButton.targetDialogComponent = StoreRegistrationFormDialogComponent;
    this.registerButton.targetDialogConfig = { width: '40rem' };
  }

  showPassword(): void { this.hidePasswordSource.next(false); }
  hidePassword(): void { this.hidePasswordSource.next(true); }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.loggingInSource.next(true);

      const details: Login = {
        name: this.username.value,
        password: this.password.value
      };

      this.appService.login(details).subscribe(
        () => {
          this.dialog.close();
          const successMessage = $localize`:Message of success after login:You have logged in`
          this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
        },
        error => {
          if (error.status === 403) {
            this.loggingInSource.next(false);
            const errorMessage = $localize`:Message of error due to bad/erroneous credentials:Your credentials were rejected`;
            this.snackBarService.open(errorMessage, COMMON_DISMISS_BUTTON_LABEL);
          } else {
            this.loggingInSource.next(false);
            this.snackBarService.open(COMMON_ERROR_MESSAGE, COMMON_DISMISS_BUTTON_LABEL);
          }
        }
      );
    }
  }

  onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }

}
