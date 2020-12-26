// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/entities/Customer';
import { Seller } from 'src/app/models/entities/Seller';
import { Product } from 'src/app/models/entities/Product';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { SellType } from 'src/app/models/entities/SellType';
import { COMMON_WARNING_MESSAGE, UNKNOWN_ERROR_MESSAGE } from 'src/text/messages';
import { ProductsArrayDialogComponent } from '../../../dialogs/products-array/products-array-dialog.component';
import { DataManagerFormComponentDirective } from '../../data-manager-form.component-directive';
import { SellManagerFormService } from './sell-manager-form.service';

export interface SaleManagerFormDialogData {
  sell: Sell;
}

@Component({
  providers: [ SellManagerFormService ],
  selector: 'app-sell-manager-form-dialog',
  templateUrl: './sell-manager-form-dialog.component.html',
  styleUrls: [ './sell-manager-form-dialog.component.css' ]
})
export class SellManagerFormDialogComponent
  extends DataManagerFormComponentDirective<Sell>
  implements OnInit {

  protected itemId: number;
  protected sellDetails: SellDetail[];
  protected sellNotReadyStates: boolean[] = [ true, true ];

  public saving$: Observable<boolean>;
  public sellDetails$: Observable<SellDetail[]>;
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  public sellTypes$: Observable<SellType[]>;
  public sellers$: Observable<Seller[]>;
  public customers$: Observable<Customer[]>;

  public formGroup: FormGroup;
  public sellDate: string = (new Date()).toLocaleDateString();
  public get type(): FormControl { return this.formGroup.get('type') as FormControl; }
  public get seller(): FormControl { return this.formGroup.get('seller') as FormControl; }
  public get customer(): FormControl { return this.formGroup.get('customer') as FormControl; }

  public sellIsntReady$: Observable<boolean>;

  public tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];
  public get dialogTitle(): string { return ((this.data?.sell?.id) ? 'Actualizar datos de' : 'Nueva') + ' Venta'; }

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: SaleManagerFormDialogData,
    protected service: SellManagerFormService,
    protected dialog: MatDialogRef<SellManagerFormDialogComponent>,
    protected snackBarService: MatSnackBar,
    protected formBuilder: FormBuilder,
    protected dialogService: MatDialog
  ) {
    super();
    this.formGroup = this.formBuilder.group({
      type: [null, Validators.required],
      seller: [null],
      customer: [null, Validators.required]
    });

    const item: Sell = (this.data?.sell) ? this.data.sell : new Sell();
    this.load(item);
  }

  protected load(s: Sell): void {
    this.itemId = s.id ? s.id : 0;

    this.sellDate = s.soldOn;
    if (s.type?.id) {
      this.type.setValue(s.type.id, { emitEvent: false, onlySelf: true });
    }
    if (s.client?.id) {
      this.customer.setValue(s.client.id, { emitEvent: false, onlySelf: true });
    }
    if (s.seller?.id) {
      this.seller.setValue(s.seller.id, { emitEvent: false, onlySelf: true });
    }

    if (this.itemId) {
      this.service.refreshSellDetailsFromId(this.itemId);
    }
  }

  ngOnInit(): void {
    this.saving$ = this.service.saving$.pipe();

    this.sellDetails$ = this.service.sellDetails$.pipe(tap(details => { this.sellDetails = details; }));

    this.sellTypes$ = this.service.getAllSellTypes();
    this.sellers$ = this.service.getAllSellers();
    this.customers$ = this.service.getAllCustomers();

    this.sellSubtotalValue$ = this.service.sellSubtotalValue$.pipe();
    this.sellTotalValue$ = this.service.sellTotalValue$.pipe();

    this.sellIsntReady$ = merge(
      this.formGroup.statusChanges.pipe(
        tap(status => { this.sellNotReadyStates[0] = (status.toUpperCase() !== 'VALID'); })
      ),
      this.sellDetails$.pipe(
        tap(array => { this.sellNotReadyStates[1] = (array.length === 0); })
      )
    ).pipe(
      map(() => (this.sellNotReadyStates[0] || this.sellNotReadyStates[1]))
    );
  }

  public onClickAddProducts(): void {
    this.dialogService.open(
      ProductsArrayDialogComponent,
      {
        width: '70rem'
      }
    ).afterClosed().subscribe(
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

  public asItem(): Sell {
    if (this.formGroup.invalid) {
      return undefined;
    } else {
      return Object.assign<Sell, Partial<Sell>>(
        new Sell(),
        {
          id: this.itemId,
          type: { id: this.type.value },
          soldOn: this.sellDate ? this.sellDate : null,
          client: { id: this.customer.value },
          seller: { id: this.seller.value },
          details: this.sellDetails
        }
      );
    }
  }

  public onSubmit(): void {
    const item = this.asItem();
    if (item) {
      this.service.submit(item).subscribe(
        success => {
          if (success) {
            if (item.id) {
              this.snackBarService.open(`Venta N°${item.id} actualizada exitosamente`, 'OK');
            } else {
              this.snackBarService.open(`Venta N°${item.id} registrada exitosamente`, 'OK');
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
