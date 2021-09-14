// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnInit, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  AbstractControl, ValidationErrors, ControlValueAccessor, Validator
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, merge, Subscription } from 'rxjs';
import { map, tap, debounceTime, take } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';
import { Image } from 'src/app/models/entities/Image';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { ImagesArrayDialogComponent } from '../../dialogs/images-array/images-array-dialog.component';
import { ImagesArrayDialogData } from '../../dialogs/images-array/ImagesArrayDialogData';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { validateFormGroup } from 'src/functions/validateFormGroup';

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
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  categories$: Observable<ProductCategory[]>;

  formGroup: FormGroup;
  get barcode(): FormControl { return this.formGroup.get('barcode') as FormControl; }
  get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  get category(): FormControl { return this.formGroup.get('category') as FormControl; }
  get price(): FormControl { return this.formGroup.get('price') as FormControl; }
  get stock(): FormControl { return this.formGroup.get('stock') as FormControl; }
  get criticalStock(): FormControl { return this.formGroup.get('criticalStock') as FormControl; }
  get description(): FormControl { return this.formGroup.get('description') as FormControl; }

  images: Image[];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.categories) private categoriesApiService: ICategoriesPublicApiService,
    private formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      criticalStock: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesApiService.fetchRootProductCategories().pipe(map(page => page.items));
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
    this.stock.reset('', { emitEvent: false });
    this.criticalStock.reset('', { emitEvent: false });
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

  validate(control: AbstractControl): ValidationErrors {
    return validateFormGroup(this.formGroup);
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
