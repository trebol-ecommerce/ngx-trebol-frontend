import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subject, Subscription, merge } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';
import { DataManagerFormComponent } from 'src/app/management/data-manager-form.acomponent';
import { Product } from 'src/data/models/entities/Product';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { ProductType } from 'src/data/models/entities/ProductType';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';

export interface ProductManagerFormDialogData {
  product: Product;
}

@Component({
  selector: 'app-product-manager-form-dialog',
  templateUrl: './product-manager-form-dialog.component.html',
  styleUrls: [ './product-manager-form-dialog.component.css' ]
})
export class ProductManagerFormDialogComponent
  extends DataManagerFormComponent<Product>
  implements OnInit, OnDestroy {

  protected itemId: number;
  protected familyChangeSub: Subscription;
  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();

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

  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ProductManagerFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.products) protected dataService: EntityDataIService<Product>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    protected dialog: MatDialogRef<ProductManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder
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

    const item: Product = (data?.product) ? data.product : new Product();
    this.load(item);
  }

  protected load(p: Product): void {
    this.itemId = p.id ? p.id : 0;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nuevo') + ' Producto';

    this.name.setValue(p.name, { emitEvent: false, onlySelf: true });
    this.family.setValue(p.productType.productFamily.id, { emitEvent: false, onlySelf: true });
    this.type.setValue(p.productType, { emitEvent: false, onlySelf: true });
    this.price.setValue(p.price, { emitEvent: false, onlySelf: true });
    this.stock.setValue(p.currentStock, { emitEvent: false, onlySelf: true });
    this.criticalStock.setValue(p.criticalStock, { emitEvent: false, onlySelf: true });

    if (p.description) {
      this.description.setValue(p.description, { emitEvent: false, onlySelf: true });
    }

    this.onChangeFamily();
  }

  ngOnInit(): void {
    this.productFamilies$ = this.sharedDataService.readAllProductFamilies();
    this.familyChangeSub = this.family.valueChanges.subscribe(() => { this.onChangeFamily(); });
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
    if (this.familyChangeSub) { this.familyChangeSub.unsubscribe(); }
  }

  protected onChangeFamily(): void {
    if (this.family.value) {
      if (this.type.disabled) { this.type.enable({ emitEvent: false, onlySelf: true }); }

      const productFamilyId = Number(this.family.value);
      if (!isNaN(productFamilyId)) {
        if (this.type.value) {
          const productTypeId = Number(this.type.value);
          this.productTypes$ = this.sharedDataService.readAllProductTypesByFamilyId(productFamilyId).pipe(
            tap(
              (types: ProductType[]) => {
                if (!(types?.length > 0 && types.find(t => t.id === productTypeId))) {
                  this.type.reset();
                }
              }
            )
          );
        } else {
          this.productTypes$ = this.sharedDataService.readAllProductTypesByFamilyId(productFamilyId);
        }
      }
    } else {
      this.type.reset({ value: null, disabled: true });
      this.productTypes$ = of([]);
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
          barcode: undefined
        }
      );
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.savingSource.next(true);
      this.dataService.create(item).subscribe(
        (result: Product) => {
          // TODO: make sure prod2 is not actually prod
          if (result.id) {
            if (item.id) {
              this.snackBarService.open('Producto \'' + item.name + '\' actualizado/a exitosamente.');
            } else {
              this.snackBarService.open('Producto \'' + result.name + '\' registrado/a exitosamente.');
            }
            this.dialog.close(result);
          } else {
            this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
            this.savingSource.next(false);
          }
        }, err => {
          this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
          this.savingSource.next(false);
        }
      );
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

}
