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
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
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
  implements OnInit {

  protected itemId: number;

  public saving$: Observable<boolean>;
  categories$: Observable<ProductCategory[]>;

  public formGroup: FormGroup;
  public get code(): FormControl { return this.formGroup.get('code') as FormControl; }
  public get name(): FormControl { return this.formGroup.get('name') as FormControl; }
  public get category(): FormControl { return this.formGroup.get('category') as FormControl; }
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
      category: ['', Validators.required],
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

    if (p.category?.code) {
      this.category.setValue(p.category.code, { emitEvent: false, onlySelf: true });
    } else {
      this.category.setValue('', { emitEvent: false, onlySelf: true });
    }

    if (p.description) {
      this.description.setValue(p.description, { emitEvent: false, onlySelf: true });
    }

    if (p.images?.length) {
      this.images = p.images.slice();
    }

    // TODO revalidate here
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();
    this.categories$ = this.service.categories$.pipe();
  }

  public asItem(): Product {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Product, Partial<Product>>(
        new Product(),
        {
          id: this.itemId,
          category: { code: this.category.value },
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
