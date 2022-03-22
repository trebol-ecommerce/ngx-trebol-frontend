/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Person } from 'src/models/entities/Person';
import { FormGroupOwner } from 'src/models/FormGroupOwner';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: [ './person-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PersonFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PersonFormComponent)
    }
  ]
})
export class PersonFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get id() { return this.formGroup.get('id') as FormControl; }
  get firstName() { return this.formGroup.get('firstName') as FormControl; }
  get lastName() { return this.formGroup.get('lastName') as FormControl; }
  get idNumber() { return this.formGroup.get('idNumber') as FormControl; }
  get email() { return this.formGroup.get('email') as FormControl; }
  get phone1() { return this.formGroup.get('phone1') as FormControl; }
  get phone2() { return this.formGroup.get('phone2') as FormControl; }

  constructor(
    private formGroupService: EntityFormGroupFactoryService
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('person');
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      debounceTime(100),
      tap(v => this.onChange(v))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }

  writeValue(obj: any): void {
    this.id.reset(undefined, { emitEvent: false });
    this.firstName.reset('', { emitEvent: false });
    this.lastName.reset('', { emitEvent: false });
    this.idNumber.reset('', { emitEvent: false });
    this.email.reset('', { emitEvent: false });
    this.phone1.reset(undefined, { emitEvent: false });
    this.phone2.reset(undefined, { emitEvent: false });
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
    const value: Partial<Person> = control.value;
    if (value) {
      const errors = {} as any;

      if (!value.firstName) {
        errors.requiredPersonfirstName = value.firstName;
      }
      if (!value.lastName) {
        errors.requiredPersonlastName = value.lastName;
      }
      if (!value.idNumber) {
        errors.requiredPersonIdNumber = value.idNumber;
      }
      if (!value.email) {
        errors.requiredPersonEmail = value.email;
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
