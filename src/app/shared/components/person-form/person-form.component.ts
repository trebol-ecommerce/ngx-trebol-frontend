/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

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
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();
  private personId: number;

  formGroup: FormGroup;

  get id() { return this.formGroup.get('id') as FormControl; }
  get firstName() { return this.formGroup.get('firstName') as FormControl; }
  get lastName() { return this.formGroup.get('lastName') as FormControl; }
  get idNumber() { return this.formGroup.get('idNumber') as FormControl; }
  get email() { return this.formGroup.get('email') as FormControl; }
  get phone1() { return this.formGroup.get('phone1') as FormControl; }
  get phone2() { return this.formGroup.get('phone2') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      id: [undefined],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      email: ['', Validators.required],
      phone1: [undefined],
      phone2: [undefined]
    });
  }

  ngOnInit(): void {
    this.valueChangesSubscriptions.push(
      this.phone1.valueChanges.pipe(tap(v => { if (!v) { this.phone1.setValue(undefined, { emitEvent: false }); } })).subscribe(),
      this.phone2.valueChanges.pipe(tap(v => { if (!v) { this.phone2.setValue(undefined, { emitEvent: false }); } })).subscribe()
    );
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  onTouched(): void {
    this.touched.emit();
  }

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
    const sub = this.formGroup.valueChanges.pipe(debounceTime(250), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(this.touched).pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = {} as any;
    const value = control.value;
    if (value) {
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
