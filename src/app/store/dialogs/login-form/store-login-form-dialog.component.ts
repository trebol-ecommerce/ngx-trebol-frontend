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
import { Login } from 'src/app/models/Login';
import { DialogSwitcherButtonComponent } from 'src/app/shared/components/dialog-switcher-button/dialog-switcher-button.component';
import { LOGIN_ERROR_MESSAGE, LOGIN_SUCCESS_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';

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

  // @ViewChild('registerButton', { static: true }) registerButton: DialogSwitcherButtonComponent;

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

  // TODO uncomment these when API support arrives
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    // this.registerButton.sourceDialogRef = this.dialog;
    // this.registerButton.targetDialogComponent = StoreRegistrationFormDialogComponent;
    // this.registerButton.targetDialogConfig = { width: '40rem', disableClose: true };
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
          this.snackBarService.open(LOGIN_SUCCESS_MESSAGE, 'OK');
        },
        error => {
          if (error.status === 403) {
            this.loggingInSource.next(false);
            this.snackBarService.open(LOGIN_ERROR_MESSAGE, 'OK');
          } else {
            this.loggingInSource.next(false);
            this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
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
