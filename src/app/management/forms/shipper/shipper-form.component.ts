/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { EntityFormGroupFactoryService } from '../../../shared/entity-form-group-factory.service';

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
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  readonly formChangesDebounceTimeMs = 50;

  @Input() formGroup: FormGroup;
  get name() { return this.formGroup.get('name') as FormControl; }

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
      this.formGroup = this.formGroupService.createFormGroupFor('shipper');
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
        this.formGroup.disable({ emitEvent: false });
      } else {
        this.formGroup.enable({ emitEvent: false });
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.formGroup || this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (this.name.errors) {
      errors.shipperName = this.name.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
