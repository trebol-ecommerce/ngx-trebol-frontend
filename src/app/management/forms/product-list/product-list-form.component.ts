/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { EntityFormGroupFactoryService } from '../../../shared/entity-form-group-factory.service';

@Component({
  selector: 'app-product-list-form',
  templateUrl: './product-list-form.component.html',
  styleUrls: [ './product-list-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProductListFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProductListFormComponent
    }
  ]
})
export class ProductListFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  readonly formChangesDebounceTimeMs = 50;

  @Input() formGroup: UntypedFormGroup;
  get code() { return this.formGroup.get('code') as UntypedFormControl; }
  get name() { return this.formGroup.get('name') as UntypedFormControl; }
  get totalCount() { return this.formGroup.get('totalCount') as UntypedFormControl; }

  onChange: (value: any) => void;
  onTouched: () => void;
  onValidatorChange: () => void;

  constructor(
    private formGroupService: EntityFormGroupFactoryService
  ) {
    this.onChange = (v) => { };
    this.onTouched = () => { };
    this.onValidatorChange = () => { };
  }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('productList');
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
      this.code.reset('', { emitEvent: false });
      this.name.reset('', { emitEvent: false });
      this.totalCount.reset(0, { emitEvent: false });
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

    if (this.code.errors) {
      errors.productListCode = this.code.errors;
    }
    if (this.name.errors) {
      errors.productListName = this.name.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
