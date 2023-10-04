/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CompanyFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CompanyFormComponent
    }
  ]
})
export class CompanyFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  readonly formChangesDebounceTimeMs = 50;

  @Input() formGroup: UntypedFormGroup;
  get idNumber() { return this.formGroup.get('idNumber') as UntypedFormControl; }
  get name() { return this.formGroup.get('name') as UntypedFormControl; }

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
        idNumber: ['', Validators.required],
        name: ['', Validators.required]
      });
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      debounceTime(this.formChangesDebounceTimeMs),
      tap(v => this.onChange(v))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  writeValue(obj: any): void {
    if (this.formGroup) {
      this.idNumber.reset('', { emitEvent: false });
      this.name.reset('', { emitEvent: false });
      if (isJavaScriptObject(obj)) {
        this.formGroup.patchValue(obj, { emitEvent: false });
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
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

    if (this.idNumber.errors) {
      errors.companyIdNumber = this.idNumber.errors;
    }
    if (this.name.errors) {
      errors.companyName = this.name.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
