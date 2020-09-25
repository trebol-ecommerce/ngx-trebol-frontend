import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from 'src/app/data/models/entities/Employee';
import { Product } from 'src/app/data/models/entities/Product';
import { Provider } from 'src/app/data/models/entities/Provider';
import { PurchaseOrder } from 'src/app/data/models/entities/PurchaseOrder';
import { PurchaseOrderDetail } from 'src/app/data/models/entities/PurchaseOrderDetail';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { ProductsArrayDialogComponent } from '../../../dialogs/products-array/products-array-dialog.component';
import { DataManagerFormComponent } from '../../data-manager-form.acomponent';
import { PurchaseOrderManagerFormService } from './purchase-order-manager-form.service';

export interface PurchaseOrderManagerFormDialogData {
  purchaseOrder: PurchaseOrder;
}

@Component({
  providers: [ PurchaseOrderManagerFormService ],
  selector: 'app-purchase-order-manager-form-dialog',
  templateUrl: './purchase-order-manager-form-dialog.component.html',
  styleUrls: [ './purchase-order-manager-form-dialog.component.css' ]
})
export class PurchaseOrderManagerFormDialogComponent
  extends DataManagerFormComponent<PurchaseOrder>
  implements OnInit {

  protected itemId: number;
  protected orderNotReadyStates: boolean[] = [ true, true ];
  protected purchaseOrderDetails: PurchaseOrderDetail[];

  public saving$: Observable<boolean>;
  public purchaseOrderDetails$: Observable<PurchaseOrderDetail[]>;
  public purchaseOrderSubtotalValue$: Observable<number>;

  public employees$: Observable<Employee[]>;
  public providers$: Observable<Provider[]>;

  public formGroup: FormGroup;
  public orderDate: string = (new Date()).toLocaleDateString();
  public get employee(): FormControl { return this.formGroup.get('employee') as FormControl; }
  public get provider(): FormControl { return this.formGroup.get('provider') as FormControl; }

  public orderIsntReady$: Observable<boolean>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];
  public get dialogTitle(): string { return ((this.data?.purchaseOrder?.id) ? 'Actualizar datos de' : 'Nuevo') + ' Orden de Compra'; };

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: PurchaseOrderManagerFormDialogData,
    protected service: PurchaseOrderManagerFormService,
    protected dialog: MatDialogRef<PurchaseOrderManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected dialogService: MatDialog
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      employee: [null, Validators.required],
      provider: [null, Validators.required]
    });

    const oc: PurchaseOrder = (this.data?.purchaseOrder) ? this.data.purchaseOrder : new PurchaseOrder();
    this.load(oc);
  }

  protected load(po: PurchaseOrder): void {
    this.itemId = po.id ? po.id : 0;

    if (po.employee?.id) {
      this.employee.setValue(po.employee.id, { emitEvent: false, onlySelf: true });
    }

    if (po.provider?.id) {
      this.provider.setValue(po.provider.id, { emitEvent: false, onlySelf: true });
    }

    if (this.itemId) {
      this.service.refreshPurchaseOrderDetailsFromId(this.itemId);
    }
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();

    this.purchaseOrderDetails$ = this.service.purchaseOrderDetails$.pipe(tap(details => { this.purchaseOrderDetails = details; }));

    this.providers$ = this.service.getAllProviders();
    this.employees$ = this.service.getAllEmployees();

    this.purchaseOrderSubtotalValue$ = this.service.purchaseOrderSubtotalValue$.pipe();

    this.orderIsntReady$ = merge(
      this.formGroup.statusChanges.pipe(
        tap(status => { this.orderNotReadyStates[0] = (status.toUpperCase() !== 'VALID'); })
      ),
      this.service.purchaseOrderDetails$.pipe(
        tap(array => { this.orderNotReadyStates[1] = (array.length === 0); })
      )
    ).pipe(
      map(() => (this.orderNotReadyStates[0] || this.orderNotReadyStates[1]))
    );
  }

  public asItem(): PurchaseOrder {
    if (this.formGroup.invalid) {
      return null;
    } else {
      return Object.assign<PurchaseOrder, Partial<PurchaseOrder>>(
        new PurchaseOrder(),
        {
          id: this.itemId ? this.itemId : null,
          status: null,
          orderedOn: this.orderDate,
          receivedOn: null,
          details: this.purchaseOrderDetails,
          provider: { id: this.provider.value },
          employee: { id: this.employee.value },
          type: { id: 'B' }
        }
      );
    }
  }

  public onClickAddProducts(): void {
    this.dialogService.open(ProductsArrayDialogComponent, {
      width: '70rem'
    }).afterClosed().subscribe(
      (newProducts: Product[]) => {
        if (newProducts?.length > 0) {
          this.service.addProducts(newProducts);
        }
      }
    );
  }

  public onClickIncreaseDetailProductQuantity(i: number): void {
    this.service.increaseDetailProductQuantityAtIndex(i);
  }

  public onClickDecreaseDetailProductQuantity(i: number): void {
    this.service.decreaseDetailProductQuantityAtIndex(i);
  }

  public onClickRemoveDetail(i: number) {
    this.service.removeDetailAtIndex(i);
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.service.submit(item).subscribe(
        success => {
          if (success) {
            if (item.id) {
              this.snackBarService.open(`Orden de compra N°${item.id} actualizada exitosamente`, 'OK');
            } else {
              this.snackBarService.open(`Orden de compra N°${item.id} registrada exitosamente`, 'OK');
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
