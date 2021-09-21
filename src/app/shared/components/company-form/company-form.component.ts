/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
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
  implements OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;

  get idNumber() { return this.formGroup.get('idNumber') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      idNumber: [null, [Validators.required]],
      name: [null, Validators.required]
    });
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.touchedSubscriptions,
      ...this.valueChangesSubscriptions]) {
      sub.unsubscribe();
    }
    this.touched.complete();
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.idNumber.reset(null, { emitEvent: false });
    this.name.reset(null, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(150), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = this.touched.pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return collectValidationErrors(control);
  }

}
