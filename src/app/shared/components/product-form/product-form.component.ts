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
import { MatDialog } from '@angular/material/dialog';
import { merge, Observable, Subscription } from 'rxjs';
import { debounceTime, map, take, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
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
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  categories$: Observable<ProductCategory[]>;

  formGroup: FormGroup;
  get barcode() { return this.formGroup.get('barcode') as FormControl; }
  get name() { return this.formGroup.get('name') as FormControl; }
  get category() { return this.formGroup.get('category') as FormControl; }
  get price() { return this.formGroup.get('price') as FormControl; }
  // get stock() { return this.formGroup.get('stock') as FormControl; }
  // get criticalStock() { return this.formGroup.get('criticalStock') as FormControl; }
  get description() { return this.formGroup.get('description') as FormControl; }

  images: Image[];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductCategories) private categoriesApiService: ITransactionalEntityDataApiService<ProductCategory>,
    private formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      category: [null],
      price: ['', Validators.required],
      // stock: [''],
      // criticalStock: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesApiService.fetchPage().pipe(map(page => page.items)); // TODO this will not include children
    this.formGroup.valueChanges.pipe(debounceTime(200), take(10), tap(() => { console.log(this.formGroup.valid); })).subscribe();
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
    this.barcode.reset('', { emitEvent: false });
    this.name.reset('', { emitEvent: false });
    this.category.reset('', { emitEvent: false });
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
      if (!value.category) {
        errors.requiredProductCategory = value.category;
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
      existing: this.images
    };
    this.dialogService.open(
      ImagesArrayDialogComponent,
      {
        data
      }
    ).afterClosed().pipe(
      tap((images: Image[]) => {
        if (images && images.length) {
          this.images = images;
        }
      })
    ).subscribe();
  }

}
