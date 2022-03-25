/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy } from '@angular/core';
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
  implements OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get name() { return this.formGroup.get('name') as FormControl; }

  constructor(
    private formGroupService: EntityFormGroupFactoryService
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('shipper');
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
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.name.reset('', { emitEvent: false });
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
    if (this.formGroup.valid) {
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
