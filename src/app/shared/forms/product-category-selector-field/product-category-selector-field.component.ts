/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryPickerDialogComponent } from '../../dialogs/product-category-picker/product-category-picker-dialog.component';

@Component({
  selector: 'app-product-category-selector-field',
  templateUrl: './product-category-selector-field.component.html',
  styleUrls: ['./product-category-selector-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProductCategorySelectorFieldComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProductCategorySelectorFieldComponent
    }
  ]
})
export class ProductCategorySelectorFieldComponent
  implements ControlValueAccessor, Validator, OnDestroy {

  noCategoryLabel = $localize`:no category chosen|Label to indicate that a product does not have a category associated:No category`;
  productCategory: ProductCategory;
  isDisabled = false;
  placeholder: string;

  @Output() select = new EventEmitter<ProductCategory>();

  constructor(
    private dialogService: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.select.complete();
  }

  onChange(value: any): void { }
  onTouched(): void { }
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.productCategory = obj;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.productCategory) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (!this.productCategory.code) {
      errors.productCategoryCode = { required: true };
    }
    if (!this.productCategory.name) {
      errors.productCategoryName = { required: true };
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  onClickClearCategory(): void {
    this.productCategory = null;
    this.onChange(null);
  }

  onClickOpenCategoryPicker(): void {
    this.dialogService.open(
      ProductCategoryPickerDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed().pipe(
      filter(next => !!next),
      tap(next => {
        this.productCategory = { code: next.code, name: next.name };
        this.onChange(next);
        this.select.emit(next);
      })
    ).subscribe();
  }

}
