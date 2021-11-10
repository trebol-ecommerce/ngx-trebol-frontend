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
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/models/entities/Person';
import { Registration } from 'src/app/models/Registration';
import { passwordMatcher } from 'src/functions/passwordMatcher';
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
  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<StoreRegistrationFormDialogComponent>,
    private snackBarService: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        person: ['', Validators.required]
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
      const details = this.asItem();
      this.appService.register(details).subscribe(
        s => {
          if (s) {
            const successMessage = $localize`:Message of success after registration:Su cuenta fue creada con éxito. Recuerde guardar su contraseña en un lugar seguro, y ¡disfrute las compras!`;
            this.snackBarService.open(successMessage, COMMON_DISMISS_BUTTON_LABEL);
            this.registeringSource.complete();
            this.dialog.close(true);
          } else {
            const errorMessage = $localize`:Message of error during registration, hint user to try again:Hubo un error al crear su cuenta. Por favor, inténtelo nuevamente.`;
            this.snackBarService.open(errorMessage, COMMON_DISMISS_BUTTON_LABEL);
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

  private asItem(): Registration | null {
    if (this.formGroup.valid) {
      return {
        name: this.name.value,
        password: this.pass1.value,
        profile: this.person.value as Person
      } as Registration;
    }
  }

}
