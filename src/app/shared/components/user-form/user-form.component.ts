/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Person } from 'src/models/entities/Person';
import { User } from 'src/models/entities/User';
import { UserRole } from 'src/models/entities/UserRole';
import { FormGroupOwner } from 'src/models/FormGroupOwner';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [ './user-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UserFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => UserFormComponent)
    }
  ]
})
export class UserFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private valueChangesSub: Subscription;

  people$: Observable<Person[]>;
  roles$: Observable<UserRole[]>;

  @Input() formGroup: FormGroup;
  get name() { return this.formGroup.get('name') as FormControl; }
  get password() { return this.formGroup.get('password') as FormControl; }
  get person() { return this.formGroup.get('person') as FormControl; }
  get role() { return this.formGroup.get('role') as FormControl; }

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataPeople) protected peopleDataApiService: IEntityDataApiService<Person>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUserRoles) protected userRolesDataApiService: IEntityDataApiService<UserRole>,
    private formGroupService: EntityFormGroupFactoryService
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('user');
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      debounceTime(100),
      tap(v => this.onChange(v))
    ).subscribe();
    this.people$ = this.peopleDataApiService.fetchPage().pipe(map(page => page.items));
    this.roles$ = this.userRolesDataApiService.fetchPage().pipe(map(page => page.items));
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }

  writeValue(obj: any): void {
    this.name.reset('', { emitEvent: false });
    this.password.reset('', { emitEvent: false });
    this.person.reset('', { emitEvent: false });
    this.role.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value: Partial<User> = control.value;
    if (value) {
      const errors = {} as any;

      if (!value.name) {
        errors.requiredUserName = value.name;
      }
      if (!value.person) {
        errors.requiredUserPerson = value.person;
      }
      if (!value.role) {
        errors.requiredUserRole = value.role;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

}
