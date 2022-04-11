/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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
  selector: 'app-store-shipping-details-form',
  templateUrl: './store-shipping-details-form.component.html',
  styleUrls: ['./store-shipping-details-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreShippingDetailsFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreShippingDetailsFormComponent
    }
  ]
})
export class StoreShippingDetailsFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;
  private includeShippingChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get included() { return this.formGroup.get('included') as FormControl; }
  get address() { return this.formGroup.get('address') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({
        included: [null, Validators.required],
        address: [{ value: null, disabled: true }, Validators.required]
      });
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      tap(v => this.onChange(v))
    ).subscribe();
    this.includeShippingChangesSub = this.included.valueChanges.pipe(
      tap(() => this.updateControlsAfterShippingInclusionChange())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
    this.includeShippingChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.included.reset(null, { emitEvent: false });
    this.address.reset({ value: null, disabled: true }, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj, { emitEvent: false });
      this.updateControlsAfterShippingInclusionChange({ emitEvent: false });
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

    if (this.included.errors) {
      errors.shippingIncluded = this.included.errors;
    }
    if (this.address.errors) {
      errors.shippingAddress = this.address.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  private updateControlsAfterShippingInclusionChange(options?: { emitEvent?: boolean, onlySelf?: boolean }): void {
    const v = this.included.value;
    if (v) {
      this.address.enable(options);
    } else {
      this.address.reset({ value: null, disabled: true }, options);
    }
  }

}
