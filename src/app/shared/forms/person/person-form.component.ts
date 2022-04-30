/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { EntityFormGroupFactoryService } from '../../entity-form-group-factory.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: [ './person-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PersonFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PersonFormComponent
    }
  ]
})
export class PersonFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
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
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.firstName.reset('', { emitEvent: false });
    this.lastName.reset('', { emitEvent: false });
    this.idNumber.reset('', { emitEvent: false });
    this.email.reset('', { emitEvent: false });
    this.phone1.reset('', { emitEvent: false });
    this.phone2.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj, { emitEvent: false });
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
    if (this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (this.firstName.errors) {
      errors.personFirstName = this.firstName.errors;
    }
    if (this.lastName.errors) {
      errors.personLastName = this.lastName.errors;
    }
    if (this.idNumber.errors) {
      errors.personIdNumber = this.idNumber.errors;
    }
    if (this.email.errors) {
      errors.personEmail = this.email.errors;
    }
    if (this.phone1.errors) {
      errors.personPhone1 = this.phone1.errors;
    }
    if (this.phone2.errors) {
      errors.personPhone2 = this.phone2.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
