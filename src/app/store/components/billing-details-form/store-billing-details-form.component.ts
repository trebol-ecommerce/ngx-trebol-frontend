/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { BILLING_TYPE_COMPANY, BILLING_TYPE_NAMES_MAP } from 'src/text/billing-type-names';

@Component({
  selector: 'app-store-billing-details-form',
  templateUrl: './store-billing-details-form.component.html',
  styleUrls: ['./store-billing-details-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreBillingDetailsFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: StoreBillingDetailsFormComponent
    }
  ]
})
export class StoreBillingDetailsFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  readonly typesOptions = [ ...BILLING_TYPE_NAMES_MAP.values() ];

  @Input() formGroup: FormGroup;
  get sellType() { return this.formGroup.get('sellType') as FormControl; }
  get company() { return this.formGroup.get('company') as FormControl; }
  get address() { return this.formGroup.get('address') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({
        sellType: [null, Validators.required],
        company: [{ value: null, disabled: true }, Validators.required],
        address: [{ value: null, disabled: true }, Validators.required]
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
    this.sellType.reset(null, { emitEvent: false });
    this.company.reset({ value: null, disabled: true }, { emitEvent: false });
    this.address.reset({ value: null, disabled: true }, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if ('sellType' in obj && obj.sellType === BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_COMPANY)) {
        this.company.enable({ emitEvent: false });
        this.address.enable({ emitEvent: false });
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
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (this.sellType.errors) {
      errors.billingType = this.sellType.errors;
    }
    if (this.company.errors) {
      errors.billingCompany = this.company.errors;
    }
    if (this.address.errors) {
      errors.billingAddress = this.address.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onSellTypeChange(v: string): void {
    if (v === BILLING_TYPE_NAMES_MAP.get(BILLING_TYPE_COMPANY)) {
      this.company.enable();
      this.address.enable();
    } else {
      this.company.reset({ value: null, disabled: true });
      this.address.reset({ value: null, disabled: true });
    }
  }

}
