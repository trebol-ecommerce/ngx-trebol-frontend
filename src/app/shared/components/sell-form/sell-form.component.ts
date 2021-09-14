// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { BillingType } from 'src/app/models/entities/BillingType';
import { Customer } from 'src/app/models/entities/Customer';
import { Product } from 'src/app/models/entities/Product';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ProductsArrayDialogComponent } from '../../../management/dialogs/products-array/products-array-dialog.component';
import { SellFormService } from './sell-manager-form.service';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: [ './sell-form.component.css' ]
})
export class SellFormComponent
  implements OnInit {

  sellDetails$: Observable<SellDetail[]>;
  sellSubtotalValue$: Observable<number>;
  sellTotalValue$: Observable<number>;

  billingTypes$: Observable<BillingType[]>;
  salespeople$: Observable<Salesperson[]>;
  customers$: Observable<Customer[]>;

  formGroup: FormGroup;
  sellDate = (new Date()).toLocaleDateString();
  get billingType() { return this.formGroup.get('billingType') as FormControl; }
  get salesperson() { return this.formGroup.get('salesperson') as FormControl; }
  get customer() { return this.formGroup.get('customer') as FormControl; }

  // sellIsntReady$: Observable<boolean>;

  tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataCustomers) private customersDataService: IEntityDataApiService<Customer>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSalespeople) private salespeopleDataService: IEntityDataApiService<Salesperson>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataBillingTypes) private billingTypesDataApiService: IEntityDataApiService<BillingType>,
    public service: SellFormService,
    private formBuilder: FormBuilder,
    private dialogService: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      billingType: [null, Validators.required],
      salesperson: [null],
      customer: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.sellDetails$ = this.service.sellDetails$.pipe();

    this.billingTypes$ = this.billingTypesDataApiService.fetchPage().pipe(map(page => page.items));
    this.salespeople$ = this.salespeopleDataService.fetchPage().pipe(map(page => page.items));
    this.customers$ = this.customersDataService.fetchPage().pipe(map(page => page.items));

    this.sellSubtotalValue$ = this.service.sellSubtotalValue$.pipe();
    this.sellTotalValue$ = this.service.sellTotalValue$.pipe();

    // this.sellIsntReady$ = merge(
    //   this.formGroup.statusChanges.pipe(
    //     tap(status => { this.sellNotReadyStates[0] = (status.toUpperCase() !== 'VALID'); })
    //   ),
    //   this.sellDetails$.pipe(
    //     tap(array => { this.sellNotReadyStates[1] = (array.length === 0); })
    //   )
    // ).pipe(
    //   map(() => (this.sellNotReadyStates[0] || this.sellNotReadyStates[1]))
    // );
  }

  onClickAddProducts(): void {
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

  onClickIncreaseDetailProductQuantity(i: number): void {
    this.service.increaseDetailProductQuantityAtIndex(i);
  }

  onClickDecreaseDetailProductQuantity(i: number): void {
    this.service.decreaseDetailProductQuantityAtIndex(i);
  }

  onClickRemoveDetail(i: number) {
    this.service.removeDetailAtIndex(i);
  }
}
