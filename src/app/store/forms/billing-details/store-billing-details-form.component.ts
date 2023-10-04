/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS,
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
  private typeNameChangesSub: Subscription;

  readonly typesOptions = [ ...BILLING_TYPE_NAMES_MAP.entries() ];

  @Input() formGroup: UntypedFormGroup;
  get typeName() { return this.formGroup.get('typeName') as UntypedFormControl; }
  get company() { return this.formGroup.get('company') as UntypedFormControl; }
  get address() { return this.formGroup.get('address') as UntypedFormControl; }

  onChange: (value: any) => void;
  onTouched: () => void;
  onValidatorChange: () => void;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.onChange = (v) => { };
    this.onTouched = () => { };
    this.onValidatorChange = () => { };
  }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formBuilder.group({
        typeName: [null, Validators.required],
        company: [{ value: null, disabled: true }, Validators.required],
        address: [{ value: null, disabled: true }, Validators.required]
      });
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      tap(v => this.onChange(v))
    ).subscribe();
    this.typeNameChangesSub = this.typeName.valueChanges.pipe(
      tap(() => this.updateControlsAfterTypeNameChange())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
    this.typeNameChangesSub?.unsubscribe();
  }

  writeValue(obj: any): void {
    if (this.formGroup) {
      this.typeName.reset(null, { emitEvent: false });
      this.company.reset({ value: null, disabled: true }, { emitEvent: false });
      this.address.reset({ value: null, disabled: true }, { emitEvent: false });
      if (isJavaScriptObject(obj)) {
        this.formGroup.patchValue(obj, { emitEvent: false });
        this.updateControlsAfterTypeNameChange({ emitEvent: false });
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.formGroup) {
      if (isDisabled) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.formGroup || this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (this.typeName.errors) {
      errors.billingType = this.typeName.errors;
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

  private updateControlsAfterTypeNameChange(options?: { emitEvent?: boolean, onlySelf?: boolean }): void {
    const v = this.typeName.value;
    if (v === BILLING_TYPE_COMPANY) {
      this.company.enable(options);
      this.address.enable(options);
    } else {
      this.company.reset({ value: null, disabled: true }, options);
      this.address.reset({ value: null, disabled: true }, options);
    }
  }

}
