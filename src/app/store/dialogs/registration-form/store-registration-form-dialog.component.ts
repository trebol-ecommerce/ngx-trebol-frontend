// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { User } from 'src/app/models/entities/User';
import { passwordMatcher } from 'src/functions/passwordMatcher';
import { Registration } from 'src/app/models/Registration';
import { Person } from 'src/app/models/entities/Person';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  protected registeringSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public registering$: Observable<boolean> = this.registeringSource.asObservable();

  public formGroup: FormGroup;
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get pass1(): FormControl { return this.formGroup.get('pass1') as FormControl; }
  public get pass2(): FormControl { return this.formGroup.get('pass2') as FormControl; }
  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    protected appService: AppService,
    protected formBuilder: FormBuilder,
    protected dialog: MatDialogRef<StoreRegistrationFormDialogComponent>,
    protected snackBarService: MatSnackBar
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

  public onSubmit(): void {
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

  public onCancel(): void {
    this.appService.cancelAuthentication();
    this.dialog.close();
  }

}
