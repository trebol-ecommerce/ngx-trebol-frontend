/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { ProductList } from 'src/models/entities/ProductList';
import { EntityFormGroupFactoryService } from '../../../shared/entity-form-group-factory.service';

@Component({
  selector: 'app-product-list-form',
  templateUrl: './product-list-form.component.html',
  styleUrls: [ './product-list-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ProductListFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ProductListFormComponent)
    }
  ]
})
export class ProductListFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get code() { return this.formGroup.get('code') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }
  get totalCount() { return this.formGroup.get('totalCount') as FormControl; }

  constructor(
    private formGroupService: EntityFormGroupFactoryService
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('productList');
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      debounceTime(100),
      tap(v => this.onChange(v))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }

  writeValue(obj: any): void {
    this.code.reset('', { emitEvent: false });
    this.name.reset('', { emitEvent: false });
    this.totalCount.reset(0, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
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
    const value: Partial<ProductList> = control.value;
    if (value) {
      const errors = {} as any;

      if (!value.code) {
        errors.requiredListCode = value.code;
      }
      if (!value.name) {
        errors.requiredListName = value.name;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

}
