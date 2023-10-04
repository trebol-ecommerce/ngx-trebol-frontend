/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Person } from 'src/models/entities/Person';

@Component({
  selector: 'app-salesperson-form',
  templateUrl: './salesperson-form.component.html',
  styleUrls: [ './salesperson-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SalespersonFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SalespersonFormComponent
    }
  ]
})
export class SalespersonFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: UntypedFormGroup;
  get person() { return this.formGroup.get('person') as UntypedFormControl; }

  onChange: (value: any) => void;
  onTouched: () => void;
  onValidatorChange: () => void;

  constructor() {
    this.onChange = (v) => { };
    this.onTouched = () => { };
    this.onValidatorChange = () => { };
  }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = new UntypedFormGroup({
        person: new UntypedFormControl('', Validators.required)
      });
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      tap(v => this.onChange(v))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }


  writeValue(obj: any): void {
    if (this.formGroup) {
      this.person.reset('', { emitEvent: false });
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

    if (this.person.errors) {
      errors.salesperson = this.person.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
