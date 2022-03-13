/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, forwardRef, OnDestroy } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors, Validator, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Image } from 'src/models/entities/Image';
import { FormGroupOwner } from 'src/models/FormGroupOwner';
import { ImagesArrayDialogComponent } from '../../dialogs/images-array/images-array-dialog.component';
import { ImagesArrayDialogData } from '../../dialogs/images-array/ImagesArrayDialogData';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [ './product-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => (ProductFormComponent))
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => (ProductFormComponent))
    }
  ]
})
export class ProductFormComponent
  implements OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  formGroup: FormGroup;
  get images() { return this.formGroup.get('images') as FormControl; }
  get barcode() { return this.formGroup.get('barcode') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }
  get category() { return this.formGroup.get('category') as FormControl; }
  get price() { return this.formGroup.get('price') as FormControl; }
  // get stock() { return this.formGroup.get('stock') as FormControl; }
  // get criticalStock() { return this.formGroup.get('criticalStock') as FormControl; }
  get description() { return this.formGroup.get('description') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      images: [[]],
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      category: [null],
      price: ['', Validators.required],
      // stock: [''],
      // criticalStock: [''],
      description: ['']
    });
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub?.unsubscribe();
    }
    this.touched.complete();
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    this.images.reset([], { emitEvent: false });
    this.barcode.reset('', { emitEvent: false });
    this.name.reset('', { emitEvent: false });
    this.category.reset(null, { emitEvent: false });
    this.price.reset('', { emitEvent: false });
    // this.stock.reset('', { emitEvent: false });
    // this.criticalStock.reset('', { emitEvent: false });
    this.description.reset('', { emitEvent: false });
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

      if (!value.barcode) {
        errors.requiredProductBarcode = value.barcode;
      }
      if (!value.name) {
        errors.requiredProductName = value.name;
      }
      if (!value.price) {
        errors.requiredProductPrice = value.price;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

  onClickAddImage(): void {
    const data: ImagesArrayDialogData = {
      existing: this.images.value
    };
    this.dialogService.open(
      ImagesArrayDialogComponent,
      {
        data
      }
    ).afterClosed().pipe(
      tap((images: Image[]) => {
        if (images && images.length) {
          this.images.setValue(images);
        }
      })
    ).subscribe();
  }

}
