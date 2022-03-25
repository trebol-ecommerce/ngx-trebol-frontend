/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup,
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-store-shipping-form',
  templateUrl: './store-shipping-form.component.html',
  styleUrls: ['./store-shipping-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreShippingFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreShippingFormComponent
    }
  ]
})
export class StoreShippingFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get requestShipping() { return this.formGroup.get('requestShipping') as FormControl; }
  get shippingAddress() { return this.formGroup.get('shippingAddress') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({
        requestShipping: [null, Validators.required],
        shippingAddress: [{ value: null, disabled: true }, Validators.required]
      });
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
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
    this.requestShipping.reset(null, { emitEvent: false });
    this.shippingAddress.reset({ value: null, disabled: true }, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if ('requestShipping' in obj && obj.requestShipping === true) {
        this.shippingAddress.enable({ emitEvent: false });
      }
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

    if (this.requestShipping.errors) {
      errors.requestShipping = this.requestShipping.errors;
    }
    if (this.shippingAddress.errors) {
      errors.shippingAddress = this.shippingAddress.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onShippingRequirementChange(v: boolean): void {
    if (v) {
      this.shippingAddress.enable();
    } else {
      this.shippingAddress.reset({ value: null, disabled: true });
    }
  }

}
