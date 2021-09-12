// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { debounceTime, tap } from 'rxjs/operators';
import { validateFormGroup } from 'src/functions/validateFormGroup';

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
  implements OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();
  protected personId: number;

  formGroup: FormGroup;

  get id() { return this.formGroup.get('id') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }
  get idCard() { return this.formGroup.get('idCard') as FormControl; }
  get email() { return this.formGroup.get('email') as FormControl; }
  get address() { return this.formGroup.get('address') as FormControl; }
  get phone1() { return this.formGroup.get('phone1') as FormControl; }
  get phone2() { return this.formGroup.get('phone2') as FormControl; }

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      idCard: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone1: [''],
      phone2: ['']
    });
  }

  ngOnDestroy(): void {
    for (const sub of this.valueChangesSubscriptions) {
      sub.unsubscribe();
    }
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.id.reset('', { emitEvent: false });
    this.name.reset('', { emitEvent: false });
    this.idCard.reset('', { emitEvent: false });
    this.email.reset('', { emitEvent: false });
    this.phone1.reset('', { emitEvent: false });
    this.phone2.reset('', { emitEvent: false });
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

  validate(control: AbstractControl): ValidationErrors {
    return validateFormGroup(this.formGroup);
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

}
