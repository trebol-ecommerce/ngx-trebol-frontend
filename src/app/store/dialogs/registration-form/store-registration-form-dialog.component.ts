/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/models/entities/Person';
import { Registration } from 'src/app/models/Registration';
import { passwordMatcher } from 'src/functions/passwordMatcher';

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

  private registeringSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  registering$: Observable<boolean> = this.registeringSource.asObservable();

  formGroup: FormGroup;
  get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  get pass1(): FormControl { return this.formGroup.get('pass1') as FormControl; }
  get pass2(): FormControl { return this.formGroup.get('pass2') as FormControl; }
  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<StoreRegistrationFormDialogComponent>,
    private snackBarService: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      person: ['']
    }, passwordMatcher);
  }

  ngOnDestroy(): void {
    this.registeringSource.complete();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.registeringSource.next(true);
      const details: Registration = this.asItem();
      this.appService.register(details).subscribe(
        s => {
          if (s) {
            this.snackBarService.open('Su cuenta fue creada con éxito.\nYa puede iniciar sesión con sus credenciales.', 'OK');
            this.registeringSource.complete();
            this.dialog.close(true);
          } else {
            this.snackBarService.open('Hubo un error al crear su cuenta. Por, favor inténtelo nuevamente.', 'OK');
            this.registeringSource.next(false);
          }
        }
      );
    }
  }

  onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }

  private asItem(): Registration {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      const profile = this.person.value as Person;

      return Object.assign<Registration, Partial<Registration>>(
        new Registration(),
        {
          name: this.name.value,
          password: this.pass1.value,
          profile
        }
      );
    }
  }

}
