/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: [ './image-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => (ImageFormComponent))
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => (ImageFormComponent))
    }
  ]
})
export class ImageFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;
  get filename() { return this.formGroup.get('filename') as FormControl; }
  get url() { return this.formGroup.get('url') as FormControl; }
  get code() { return this.formGroup.get('code') as FormControl; }
  // get file() { return this.formGroup.get('file') as FormControl; }

  images: Image[];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataImages) private imagesDataApiService: ITransactionalEntityDataApiService<Image>,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      filename: ['', Validators.required],
      url: ['', Validators.required],
      code: [null, Validators.required]
      // file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.formGroup.valueChanges.pipe(debounceTime(200), take(10), tap(() => { console.log(this.formGroup.valid); })).subscribe();
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.filename.reset('', { emitEvent: false });
    this.url.reset('', { emitEvent: false });
    this.code.reset('', { emitEvent: false });
    // this.file.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
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

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { required: value };
    } else {
      const errors = {} as any;
      if (!value.filename) {
        errors.requiredFilename = value.filename;
      }
      if (!value.url) {
        errors.requiredImageUrl = value.url;
      }
      if (!value.code) {
        errors.requiredImageCode = value.code;
      }
      // if (!value.file) {
      //   errors.requiredProductPrice = value.file;
      // }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

}
