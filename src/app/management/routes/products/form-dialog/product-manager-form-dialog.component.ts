// Copyright (c) 2021 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/models/entities/Product';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { DataManagerFormComponentDirective } from '../../data-manager-form.component-directive';
import { ProductManagerFormService } from './product-manager-form.service';
import { Image } from 'src/app/models/entities/Image';
import { ImagesArrayDialogComponent } from 'src/app/management/dialogs/images-array/images-array-dialog.component';
import { ImagesArrayDialogData } from 'src/app/management/dialogs/images-array/ImagesArrayDialogData';
import { DataManagerFormDialogData } from '../../DataManagerFormDialogData';

@Component({
  selector: 'app-product-manager-form-dialog',
  templateUrl: './product-manager-form-dialog.component.html',
  styleUrls: [ './product-manager-form-dialog.component.css' ]
})
export class ProductManagerFormDialogComponent
  extends DataManagerFormComponentDirective<Product>
  implements OnInit, OnDestroy {

  protected itemId: number;
  protected familyChangeSub: Subscription;

  public saving$: Observable<boolean>;
  public productFamilies$: Observable<ProductFamily[]>;
  public productTypes$: Observable<ProductType[]>;

  public formGroup: FormGroup;
  public get code(): FormControl { return this.formGroup.get('code') as FormControl; }
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get family(): FormControl { return this.formGroup.get('family') as FormControl; }
  public get type(): FormControl { return this.formGroup.get('type') as FormControl; }
  public get price(): FormControl { return this.formGroup.get('price') as FormControl; }
  public get stock(): FormControl { return this.formGroup.get('stock') as FormControl; }
  public get criticalStock(): FormControl { return this.formGroup.get('criticalStock') as FormControl; }
  public get description(): FormControl { return this.formGroup.get('description') as FormControl; }

  public images: Image[];
  public get dialogTitle(): string { return ((this.data?.item?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Producto'; }

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: DataManagerFormDialogData<Product>,
    protected service: ProductManagerFormService,
    protected dialog: MatDialogRef<ProductManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      family: [null, Validators.required],
      type: [{value: null, disabled: true}, Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      criticalStock: ['', Validators.required],
      description: ['']
    });

    const item: Product = (this.data?.item) ? this.data.item : new Product();
    this.load(item);
  }

  protected load(p: Product): void {
    this.itemId = p.id ? p.id : 0;

    this.name.setValue(p.name, { emitEvent: false, onlySelf: true });
    this.code.setValue(p.barcode, { emitEvent: false, onlySelf: true });
    this.price.setValue(p.price, { emitEvent: false, onlySelf: true });
    this.stock.setValue(p.currentStock, { emitEvent: false, onlySelf: true });
    this.criticalStock.setValue(p.criticalStock, { emitEvent: false, onlySelf: true });

    if (p.productType?.id) {
      this.type.setValue(p.productType.id, { emitEvent: false, onlySelf: true });
      this.family.setValue(p.productType.productFamily.id, { emitEvent: false, onlySelf: true });
    } else {
      this.type.setValue(null, { emitEvent: false, onlySelf: true });
      this.family.setValue(null, { emitEvent: false, onlySelf: true });
    }

    if (p.description) {
      this.description.setValue(p.description, { emitEvent: false, onlySelf: true });
    }

    if (p.images?.length) {
      this.images = p.images.slice();
    }

    this.onChangeFamily();
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();
    this.productFamilies$ = this.service.getAllProductFamilies();
    this.productTypes$ = this.service.productTypes$.pipe(
      tap(
        (types: ProductType[]) => {
          const productTypeId = this.type.value;
          if (!(types?.length > 0 && types.find(t => t.id === productTypeId))) {
            this.type.reset();
          }
        }
      )
    );
    this.familyChangeSub = this.family.valueChanges.subscribe(() => { this.onChangeFamily(); });
  }

  ngOnDestroy(): void {
    if (this.familyChangeSub) { this.familyChangeSub.unsubscribe(); }
  }

  protected onChangeFamily(): void {
    const productFamilyId = this.family.value;
    this.service.updateSelectedFamily(productFamilyId);
    if (productFamilyId) {
      if (this.type.disabled) {
        this.type.enable({ emitEvent: false, onlySelf: true });
      }
    } else {
      this.type.reset({ value: null, disabled: true });
    }
  }

  public asItem(): Product {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Product, Partial<Product>>(
        new Product(),
        {
          id: this.itemId,
          productType: { id: this.type.value, productFamily: { id: this.family.value } },
          name: this.name.value,
          price: this.price.value,
          currentStock: this.stock.value,
          criticalStock: this.criticalStock.value,
          description: this.description.value,
          barcode: this.code.value,
          images: this.images
        }
      );
    }
  }

  public onClickAddImage(): void {
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
    )
    .subscribe();
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.service.submit(item).subscribe(
        success => {
          if (success) {
            if (item.id) {
              this.snackBarService.open(`Producto ${item.name} actualizado exitosamente`, 'OK');
            } else {
              this.snackBarService.open(`Producto ${item.name} registrado exitosamente`, 'OK');
            }
            this.dialog.close(item);
          } else {
            this.snackBarService.open(COMMON_WARNING_MESSAGE, 'OK');
          }
        },
        error => {
          this.snackBarService.open(UNKNOWN_ERROR_MESSAGE, 'OK');
        }
      );
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

}
