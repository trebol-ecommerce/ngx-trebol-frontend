// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, iif, of } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { User } from 'src/app/models/entities/User';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponentDirective } from '../../data-manager-form.component-directive';
import { UserManagerFormService } from './user-manager-form.service';
import { UserRole } from 'src/app/models/entities/UserRole';
import { DataManagerFormDialogData } from '../../DataManagerFormDialogData';

@Component({
  selector: 'app-user-manager-form-dialog',
  templateUrl: './user-manager-form-dialog.component.html',
  styleUrls: [ './user-manager-form-dialog.component.css' ]
})
export class UserManagerFormDialogComponent
  extends DataManagerFormComponentDirective<User>
  implements OnInit {

  protected itemId: number;

  public saving$: Observable<boolean>;
  public people$: Observable<Person[]>;
  public roles$: Observable<UserRole[]>;

  public formGroup: FormGroup;
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get password(): FormControl { return this.formGroup.get('password') as FormControl; }
  public get person(): FormControl { return this.formGroup.get('person') as FormControl; }
  public get role(): FormControl { return this.formGroup.get('role') as FormControl; }

  public get dialogTitle(): string { return ((this.data?.item?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Usuario'; }

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: DataManagerFormDialogData<User>,
    protected service: UserManagerFormService,
    protected dialog: MatDialogRef<UserManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      person: [undefined, Validators.required],
      role: [undefined, Validators.required],
    });

    this.getPromptedUserDetails().subscribe(user => this.load(user));
  }

  protected load(u: User): void {
    this.itemId = u.id ? u.id : 0;
    this.name.setValue(u.name);

    if (this.itemId) {
      this.password.setValidators(null);
    }
    if (u.person?.id) {
      this.person.setValue(u.person.id);
    }
    if (u.role) {
      this.role.setValue(u.role);
    }
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();
    this.people$ = this.service.getPeople();
    this.roles$ = this.service.getUserRoles();
  }

  public asItem(): User {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<User, Partial<User>>(
        new User(),
        {
          id: this.itemId,
          name: this.name.value,
          password: this.password.value,
          person: { id: this.person.value },
          role: this.role.value
        }
      );
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.service.submit(item).subscribe(
        success => {
          if (success) {
            if (this.itemId) {
              this.snackBarService.open(`Usuario ${item.name} actualizado/a exitosamente.`, 'OK');
            } else {
              this.snackBarService.open(`Usuario ${item.name} registrado/a exitosamente.`, 'OK');
            }
            this.dialog.close(item);
          } else {
            this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
          }
        },
        error => {
          this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
        }
      );
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

  private getPromptedUserDetails(): Observable<User> {
    return (!!this.data?.item ?
      this.service.getUserDetails(this.data.item.id) :
      of(new User())
    );
  }

}
