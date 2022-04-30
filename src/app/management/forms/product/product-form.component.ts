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
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { ImagesArrayDialogComponent } from 'src/app/management/dialogs/images-array/images-array-dialog.component';
import { ImagesArrayDialogData } from 'src/app/management/dialogs/images-array/ImagesArrayDialogData';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { Image } from 'src/models/entities/Image';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [ './product-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProductFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProductFormComponent
    }
  ]
})
export class ProductFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  @Input() formGroup: FormGroup;
  get images() { return this.formGroup.get('images') as FormControl; }
  get barcode() { return this.formGroup.get('barcode') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }
  get category() { return this.formGroup.get('category') as FormControl; }
  get price() { return this.formGroup.get('price') as FormControl; }
  // get stock() { return this.formGroup.get('stock') as FormControl; }
  // get criticalStock() { return this.formGroup.get('criticalStock') as FormControl; }
  get description() { return this.formGroup.get('description') as FormControl; }

  constructor(
    private formGroupService: EntityFormGroupFactoryService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('product');
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
    this.images.reset([], { emitEvent: false });
    this.barcode.reset('', { emitEvent: false });
    this.name.reset('', { emitEvent: false });
    this.category.reset(null, { emitEvent: false });
    this.price.reset('', { emitEvent: false });
    // this.stock.reset('', { emitEvent: false });
    // this.criticalStock.reset('', { emitEvent: false });
    this.description.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj, { emitEvent: false });
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

    if (this.barcode.errors) {
      errors.productBarcode = this.barcode.errors;
    }
    if (this.name.errors) {
      errors.productName = this.name.errors;
    }
    if (this.price.errors) {
      errors.productPrice = this.price.errors;
    }
    if (this.category.errors) {
      errors.productCategory = this.category.errors;
    }
    if (this.description.errors) {
      errors.productDescription = this.description.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
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
