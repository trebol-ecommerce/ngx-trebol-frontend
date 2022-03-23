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
import { Image } from 'src/models/entities/Image';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: [ './image-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ImageFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ImageFormComponent)
    }
  ]
})
export class ImageFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get filename() { return this.formGroup.get('filename') as FormControl; }
  get url() { return this.formGroup.get('url') as FormControl; }
  get code() { return this.formGroup.get('code') as FormControl; }

  constructor(
    private formGroupService: EntityFormGroupFactoryService
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('image');
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
    this.filename.reset('', { emitEvent: false });
    this.url.reset('', { emitEvent: false });
    this.code.reset('', { emitEvent: false });
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
    const value: Partial<Image> = control.value;
    if (value) {
      const errors = {} as any;

      if (!value.filename) {
        errors.requiredFilename = value.filename;
      }
      if (!value.url) {
        errors.requiredImageUrl = value.url;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

}
