/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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

  private actionSubscription: Subscription;

  noCategoryLabel = $localize`:no category chosen|Label to indicate that a product does not have a category associated:No category`;
  productCategory: ProductCategory;
  isDisabled = false;
  placeholder: string;

  @Output() categorySelection = new EventEmitter<ProductCategory>();

  onChange: (value: any) => void;
  onTouched: () => void;
  onValidatorChange: () => void;

  constructor(
    private dialogService: MatDialog
  ) {
    this.onChange = (v) => { };
    this.onTouched = () => { };
    this.onValidatorChange = () => { };
  }

  ngOnDestroy(): void {
    this.categorySelection.complete();
    this.actionSubscription?.unsubscribe();
  }

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
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.dialogService.open(
      ProductCategoryPickerDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed().pipe(
      filter(next => !!next),
      tap((next: ProductCategory) => {
        this.productCategory = { code: next.code, name: next.name };
        this.onChange(next);
        this.categorySelection.emit(next);
      })
    ).subscribe();
  }

}
