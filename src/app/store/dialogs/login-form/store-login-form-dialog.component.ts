// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { Login } from 'src/app/data/models/Login';
import { LOGIN_ERROR_MESSAGE, LOGIN_SUCCESS_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';

@Component({
  selector: 'app-store-login-form-dialog',
  templateUrl: './store-login-form-dialog.component.html',
  styleUrls: ['./store-login-form-dialog.component.css']
})
export class StoreLoginFormDialogComponent {

  protected loggingInSource: Subject<boolean> = new Subject();
  protected hidePasswordSource: Subject<boolean> = new BehaviorSubject(true);

  public loggingIn$: Observable<boolean> = this.loggingInSource.asObservable();
  public togglePasswordIcon$: Observable<string>;
  public passwordInputType$: Observable<string>;

  public formGroup: FormGroup;
  public get username(): FormControl { return this.formGroup.get('username') as FormControl; }
  public get password(): FormControl { return this.formGroup.get('password') as FormControl; }

  constructor(
    protected dialog: MatDialogRef<StoreLoginFormDialogComponent>,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected snackBarService: MatSnackBar,
    protected appService: AppService
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.togglePasswordIcon$ = this.hidePasswordSource.asObservable().pipe(map(hide => (hide ? 'visibility' : 'visibility_off')));
    this.passwordInputType$ = this.hidePasswordSource.asObservable().pipe(map(hide => (hide ? 'password' : 'text')));
  }

  public showPassword(): void { this.hidePasswordSource.next(false); }
  public hidePassword(): void { this.hidePasswordSource.next(true); }

  public onSubmit(): void {
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

  public onCancel(): void {
    this.dialog.close();
  }

}
