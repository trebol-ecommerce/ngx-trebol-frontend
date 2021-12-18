/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Address } from 'src/models/entities/Address';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: [ './address-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent
  implements OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;

  @Input() @Output()
  get address(): Address {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      const addressData: Partial<Address> = {
        city: this.city.value,
        municipality: this.municipality.value,
        firstLine: this.firstLine.value,
        secondLine: this.secondLine.value,
        notes: this.notes.value
      };
      return Object.assign(new Address(), addressData);
    }
  }
  set address(prs: Address) {
    this.city.setValue(prs.city, { emitEvent: false, onlySelf: true });
    this.municipality.setValue(prs.municipality, { emitEvent: false, onlySelf: true });
    this.firstLine.setValue(prs.firstLine, { emitEvent: false, onlySelf: true });
    this.secondLine.setValue(prs.secondLine, { emitEvent: false, onlySelf: true });
    this.notes.setValue(prs.notes, { emitEvent: false, onlySelf: true });
  }

  get city() { return this.formGroup.get('city') as FormControl; }
  get municipality() { return this.formGroup.get('municipality') as FormControl; }
  get firstLine() { return this.formGroup.get('firstLine') as FormControl; }
  get secondLine() { return this.formGroup.get('secondLine') as FormControl; }
  get notes() { return this.formGroup.get('notes') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      firstLine: ['', Validators.required],
      secondLine: [''],
      notes: ['']
    });
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.touchedSubscriptions,
      ...this.valueChangesSubscriptions]) {
      sub.unsubscribe();
    }
    this.touched.complete();
  }

  writeValue(obj: any): void {
    this.city.reset(null, { emitEvent: false });
    this.municipality.reset(null, { emitEvent: false });
    this.firstLine.reset(null, { emitEvent: false });
    this.secondLine.reset(null, { emitEvent: false });
    this.notes.reset(null, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(150), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = this.touched.pipe(tap(fn)).subscribe();
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
      if (!value.city) {
        errors.requiredAddressCity = value.city;
      }
      if (!value.municipality) {
        errors.requiredAddressMunicipality = value.municipality;
      }
      if (!value.firstLine) {
        errors.requiredAddressFirstLine = value.firstLine;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

}
