/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: [ './image-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageFormComponent
    }
  ]
})
export class ImageFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  readonly formChangesDebounceTimeMs = 50;

  @Input() formGroup: FormGroup;
  get filename() { return this.formGroup.get('filename') as FormControl; }
  get url() { return this.formGroup.get('url') as FormControl; }
  get code() { return this.formGroup.get('code') as FormControl; }

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
      this.formGroup = this.formGroupService.createFormGroupFor('image');
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
      this.filename.reset('', { emitEvent: false });
      this.url.reset('', { emitEvent: false });
      this.code.reset('', { emitEvent: false });
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

    if (this.filename.errors) {
      errors.imageFilename = this.filename.errors;
    }
    if (this.url.errors) {
      errors.imageUrl = this.url.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
