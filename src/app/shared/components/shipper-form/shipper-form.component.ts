/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-shipper-form',
  templateUrl: './shipper-form.component.html',
  styleUrls: ['./shipper-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ShipperFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ShipperFormComponent
    }
  ]
})
export class ShipperFormComponent
  implements OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;

  get name() { return this.formGroup.get('name') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required]
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

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.name.reset('', { emitEvent: false });
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
      if (!value.name) {
        errors.requiredShipperName = value.name;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

}
