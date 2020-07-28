import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppUserService } from 'src/app/app-user.service';
import { DataManagerFormComponent } from 'src/app/management/data-manager-form.acomponent';
import { Employee } from 'src/data/models/entities/Employee';
import { Product } from 'src/data/models/entities/Product';
import { Provider } from 'src/data/models/entities/Provider';
import { PurchaseOrder } from 'src/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/data/models/entities/PurchaseOrderDetail';
import { CompositeEntityDataIService } from 'src/data/services/composite-entity.data.iservice';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { ERR_SRV_COMM_MSG } from 'src/text/messages';
import { ProductsArrayDialogComponent } from '../../../products-array-dialog/products-array-dialog.component';

export interface PurchaseOrderManagerFormDialogData {
  purchaseOrder: PurchaseOrder;
}

@Component({
  selector: 'app-purchase-order-manager-form-dialog',
  templateUrl: './purchase-order-manager-form-dialog.component.html',
  styleUrls: [ './purchase-order-manager-form-dialog.component.css' ]
})
export class PurchaseOrderManagerFormDialogComponent
  extends DataManagerFormComponent<PurchaseOrder>
  implements OnInit {

  protected itemId: number;
  protected purchaseOrderDetails: PurchaseOrderDetail[] = [];
  protected purchaseOrderDetailsSource: Subject<PurchaseOrderDetail[]> = new BehaviorSubject([]);
  protected savingSource: Subject<boolean> = new Subject();

  public saving$: Observable<boolean> = this.savingSource.asObservable();
  public purchaseOrderDetails$: Observable<PurchaseOrderDetail[]> = this.purchaseOrderDetailsSource.asObservable();
  public purchaseOrderSubtotalValue$: Observable<number>;
  public employees$: Observable<Employee[]>;
  public providers$: Observable<Provider[]>;

  public formGroup: FormGroup;
  public get employee(): FormControl { return this.formGroup.get('employee') as FormControl; }
  public get provider(): FormControl { return this.formGroup.get('provider') as FormControl; }
  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];

  public fechaSolicitud: string;
  public dialogTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: PurchaseOrderManagerFormDialogData,
    @Inject(DATA_INJECTION_TOKENS.purchaseOrders) protected dataService: CompositeEntityDataIService<PurchaseOrder, PurchaseOrderDetail>,
    @Inject(DATA_INJECTION_TOKENS.employees) protected employeeDataService: EntityDataIService<Employee>,
    @Inject(DATA_INJECTION_TOKENS.providers) protected providerDataService: EntityDataIService<Provider>,
    protected appUserService: AppUserService,
    protected dialog: MatDialogRef<PurchaseOrderManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected dialogService: MatDialog
  ) {
    super();
    this.fechaSolicitud = (new Date()).toLocaleDateString();

    this.formGroup = this.formBuilder.group({
      employee: [null, Validators.required],
      provider: [null, Validators.required]
    });

    const oc: PurchaseOrder = (data?.purchaseOrder) ? data.purchaseOrder : new PurchaseOrder();
    this.load(oc);
  }

  protected load(po: PurchaseOrder): void {
    this.itemId = po.id;
    this.dialogTitle = ((this.itemId) ? 'Actualizar datos de' : 'Nuevo') + ' Orden de Compra';

    if (po.employee?.id) {
      this.employee.setValue(po.employee.id, { emitEvent: false, onlySelf: true });
    }

    if (po.provider?.id) {
      this.provider.setValue(po.provider.id, { emitEvent: false, onlySelf: true });
    }

    if (this.itemId) {
      this.dataService.readDetailsById(this.itemId).subscribe(
        (details: PurchaseOrderDetail[]) => {
          this.purchaseOrderDetails = details;
          this.purchaseOrderDetailsSource.next(details);
        }
      );
    }
  }

  ngOnInit(): void {
    this.providers$ = this.providerDataService.readAll();
    this.employees$ = this.employeeDataService.readAll();
  }

  public asItem(): PurchaseOrder {
    if (this.formGroup.invalid) {
      return null;
    } else {
      return {
        id: this.itemId ? this.itemId : null,
        status: null,
        orderedOn: this.fechaSolicitud,
        receivedOn: null,
        details: this.purchaseOrderDetails,
        provider: { id: this.provider.value },
        employee: { id: this.employee.value },
        type: { id: 'B' }
      };
    }
  }

  public onClickAddProducts(): void {
    this.dialogService.open(ProductsArrayDialogComponent, {
      width: '70rem'
    }).afterClosed().subscribe(
      (newProducts: Product[]) => {
        console.log(newProducts);

        if (newProducts?.length > 0) {
          const newDetails = newProducts.map(
            product => Object.assign<PurchaseOrderDetail, Partial<PurchaseOrderDetail>>(
              new PurchaseOrderDetail(),
              {
                product,
                units: 1
              }
            )
          );
          console.log(newDetails);
          this.purchaseOrderDetails.push(...newDetails);
          this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
        }
      }
    );
  }

  public onClickIncreaseDetailProductQuantity(index: number): void {
    const detalle: PurchaseOrderDetail = this.purchaseOrderDetails[index];
    if (detalle) {
      detalle.units++;
      this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
    }
  }

  public onClickDecreaseDetailProductQuantity(index: number): void {
    const detalle: PurchaseOrderDetail = this.purchaseOrderDetails[index];
    if (detalle) {
      detalle.units--;
      this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
    }
  }

  public onClickRemoveDetail(index: number) {
    this.purchaseOrderDetails.splice(index, 1);
    this.purchaseOrderDetailsSource.next(this.purchaseOrderDetails);
  }

  public onSubmit(): void {
    if (this.purchaseOrderDetails.length === 0) {
      this.snackBarService.open('Se requieren productos para realizar una orden de compra.', undefined, { duration: 6000 });
    } else if (this.purchaseOrderDetails.some(dtl => dtl.units <= 0)) {
      this.snackBarService.open('Está solicitando 0 o menos unidades de un producto.', undefined, { duration: 8000 });
    } else {
      const item = this.asItem();
      if (item) {
        this.savingSource.next(true);

        this.dataService.create(item).subscribe(
          (result: PurchaseOrder) => {
            // TODO: make sure vnt2 is not actually vnt
            if (result.id) {
              if (item.id) {
                this.snackBarService.open('Orden de compra \'' + result.id + '\' actualizada exitosamente.', 'OK', { duration: -1 });
              } else {
                this.snackBarService.open('Orden de compra \'' + result.id + '\' registrada exitosamente.', 'OK', { duration: -1 });
              }
              this.dialog.close(result);
            } else {
              this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
              this.savingSource.next(false);
            }
          },
          err => {
            this.snackBarService.open(ERR_SRV_COMM_MSG, 'OK', { duration: -1 });
            this.savingSource.next(false);
          }
        );
      }
    }
  }

  public onCancel(): void {
    this.dialog.close();
  }

}
