import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import { map as concatMap, map, switchMap, exhaust, toArray } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { DataItemFormAbstractComponent } from 'src/app/management/data-item-form.abstract-component';
import { Client } from 'src/data/models/entities/Client';
import { Employee } from 'src/data/models/entities/Employee';
import { Product } from 'src/data/models/entities/Product';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { SellType } from 'src/data/models/entities/SellType';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { ProductsArrayDialogComponent } from '../../../products-array-dialog/products-array-dialog.component';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';

export interface SaleManagerFormDialogData {
  sell: Sell;
}

@Component({
  selector: 'app-sell-manager-form-dialog',
  templateUrl: './sell-manager-form-dialog.component.html',
  styleUrls: [ './sell-manager-form-dialog.component.css' ]
})
export class SellManagerFormDialogComponent
  extends DataItemFormAbstractComponent<Sell>
  implements OnInit, OnDestroy {

  protected itemId: number;
  protected sellDetails: SellDetail[] = [];
  protected savingSource: Subject<boolean> = new Subject();
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  public sellTypes$: Observable<SellType[]>;
  public employees$: Observable<Employee[]>;
  public clients$: Observable<Client[]>;

  public formGroup: FormGroup;
  public sellDate: string = (new Date()).toLocaleDateString();
  public get type(): FormControl { return this.formGroup.get('type') as FormControl; }
  public get employee(): FormControl { return this.formGroup.get('employee') as FormControl; }
  public get client(): FormControl { return this.formGroup.get('client') as FormControl; }

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];
  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: SaleManagerFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.sales) protected dataService: CompositeEntityDataIService<Sell, SellDetail>,
    @Inject(DATA_INJECTION_TOKENS.products) protected productDataService: EntityDataIService<Product>,
    @Inject(DATA_INJECTION_TOKENS.clients) protected clientDataService: EntityDataIService<Client>,
    @Inject(DATA_INJECTION_TOKENS.employees) protected employeeDataService: EntityDataIService<Employee>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    protected dialog: MatDialogRef<SellManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected appUserService: AppUserService,
    protected dialogService: MatDialog
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      type: [null, Validators.required],
      employee: [null],
      client: [null, Validators.required]
    });

    const item: Sell = (data?.sell) ? data.sell : new Sell();
    this.load(item);
  }

  protected load(s: Sell): void {
    this.itemId = s.id ? s.id : 0;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nueva') + ' Venta';

    this.sellDate = s.soldOn;
    if (s.type?.id) {
      this.type.setValue(s.type.id, { emitEvent: false, onlySelf: true });
    }
    if (s.client?.id) {
      this.client.setValue(s.client.id, { emitEvent: false, onlySelf: true });
    }
    if (s.employee?.id) {
      this.employee.setValue(s.employee.id, { emitEvent: false, onlySelf: true });
    }

    if (this.itemId) {
      this.dataService.readDetailsById(this.itemId).pipe(
        switchMap(sellDetails => from(sellDetails)),
        concatMap<SellDetail, Observable<SellDetail>>(
          detail => this.productDataService.readById(detail.product.id).pipe(
            map((product) => {
              detail.product = product;
              return detail;
            })
          )
        ),
        exhaust(),
        toArray()
      ).subscribe(
        sellDetails => {
          this.sellDetails = sellDetails;
          this.sellDetailsSource.next(sellDetails);
        }
      );
    }
  }

  ngOnInit(): void {
    this.sellTypes$ = this.sharedDataService.readAllSellTypes();
    this.employees$ = this.employeeDataService.readAll();
    this.clients$ = this.clientDataService.readAll();

    this.sellSubtotalValue$ = this.sellDetails$.pipe(
      concatMap(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(detail => detail.product.price * detail.units).reduce((a, b) => a + b);
        }
      )
    );

    this.sellTotalValue$ = this.sellSubtotalValue$.pipe(concatMap(subtotal => Math.ceil(subtotal * 1.19)));
  }

  ngOnDestroy(): void {
    this.savingSource.complete();
    this.sellDetailsSource.complete();
  }

  public onClickAddProducts(): void {
    this.dialogService.open(
      ProductsArrayDialogComponent,
      { width: '70rem' }
    ).afterClosed().subscribe(
      (newProducts: Product[]) => {
        if (newProducts && newProducts.length > 0) {
          const newSellDetails: SellDetail[] = newProducts.map(
            (product: Product) => Object.assign<SellDetail, Partial<SellDetail>>(
              new SellDetail(),
              {
                product,
                units: 1
              }
            )
          );
          this.sellDetails.push(...newSellDetails);
          this.sellDetailsSource.next(this.sellDetails);
        }
      }
    );
  }

  public onClickIncreaseDetailProductQuantity(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units++;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public onClickDecreaseDetailProductQuantity(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units--;

      if (detail.units <= 0) {
        this.sellDetails.splice(i, 0);
      }
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public onClickRemoveDetail(i: number) {
    this.sellDetails.splice(i, 1);
    this.sellDetailsSource.next(this.sellDetails);
  }

  public asItem(): Sell {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return {
        id: this.itemId,
        type: { id: this.type.value },
        soldOn: this.sellDate ? this.sellDate : null,
        client: { id: this.client.value },
        employee: { id: this.employee.value },
        details: this.sellDetails
      };
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.savingSource.next(true);
      this.dataService.create(item).subscribe(
        (result: Sell) => {
          // TODO: make sure vt2 is not actually vt
          if (result.id) {
            if (item.id) {
              this.snackBarService.open('Venta N° \'' + item.id + '\' actualizada exitosamente.');
            } else {
              this.snackBarService.open('Venta N° \'' + result.id + '\' registrada exitosamente.');
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
