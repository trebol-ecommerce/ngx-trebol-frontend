/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductCategoryPickerDialogComponent } from '../../dialogs/product-category-picker/product-category-picker-dialog.component';

@Component({
  selector: 'app-product-category-selector-form-field',
  templateUrl: './product-category-selector-form-field.component.html',
  styleUrls: ['./product-category-selector-form-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ProductCategorySelectorFormFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ProductCategorySelectorFormFieldComponent)
    }
  ]
})
export class ProductCategorySelectorFormFieldComponent
  implements ControlValueAccessor, Validator {

  noCategoryLabel = $localize`:no category chosen|Label to indicate that a product does not have a category associated:No category`;
  productCategory: ProductCategory = null;
  isDisabled = false;
  placeholder: string;

  constructor(
    private dialogService: MatDialog
  ) { }

  onChange(value: any): void { }
  onTouched(): void { }

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
    const value: Partial<ProductCategory> = control.value;
    if (value) {
      const errors = {} as any;

      if (!value.code) {
        errors.requiredCode = value.code;
      }
      if (!value.name) {
        errors.requiredName = value.name;
      }

      if (JSON.stringify(errors) !== '{}') {
        return errors;
      }
    }
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
      filter(next => !!next)
    ).subscribe(
      next => {
        this.productCategory = { code: next.code, name: next.name };
        this.onChange(next);
      }
    );
  }

}
