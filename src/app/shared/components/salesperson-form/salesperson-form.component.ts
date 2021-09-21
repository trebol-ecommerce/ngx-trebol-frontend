/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Person } from 'src/app/models/entities/Person';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

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
  implements OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;
  get person() { return this.formGroup.get('person') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      person: ['']
    });
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    this.person.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      if (obj instanceof Person) {
        this.person.setValue(obj);
      } else {
        this.formGroup.patchValue(obj);
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(250), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(this.touched).pipe(tap(fn)).subscribe();
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

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }
}
