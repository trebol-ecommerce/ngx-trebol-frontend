/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CurrencyPipe } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { ProductsArrayDialogComponent } from 'src/app/management/dialogs/products-array/products-array-dialog.component';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { BillingType } from 'src/models/entities/BillingType';
import { Customer } from 'src/models/entities/Customer';
import { Product } from 'src/models/entities/Product';
import { Salesperson } from 'src/models/entities/Salesperson';
import { SellDetail } from 'src/models/entities/SellDetail';
import { SellFormService } from './sell-manager-form.service';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SellFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SellFormComponent
    }
  ]
})
export class SellFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  private valueChangesSub: Subscription;

  sellDetails$: Observable<SellDetail[]>;
  sellNetValueLabel$: Observable<string>;
  sellTotalValueLabel$: Observable<string>;

  billingTypes$: Observable<BillingType[]>;
  salespeople$: Observable<Salesperson[]>;
  customers$: Observable<Customer[]>;

  @Input() formGroup: FormGroup;
  get date() { return this.formGroup.get('date') as FormControl; }
  get billingType() { return this.formGroup.get('billingType') as FormControl; }
  get salesperson() { return this.formGroup.get('salesperson') as FormControl; }
  get customer() { return this.formGroup.get('customer') as FormControl; }

  // sellIsntReady$: Observable<boolean>;

  tableColumns: string[] = [ 'product', 'price', 'quantity', 'actions' ];

  constructor(
    private formGroupService: EntityFormGroupFactoryService,
    @Inject(API_INJECTION_TOKENS.dataCustomers) private customersDataService: IEntityDataApiService<Customer>,
    @Inject(API_INJECTION_TOKENS.dataSalespeople) private salespeopleDataService: IEntityDataApiService<Salesperson>,
    @Inject(API_INJECTION_TOKENS.dataBillingTypes) private billingTypesDataApiService: IEntityDataApiService<BillingType>,
    private service: SellFormService,
    private dialogService: MatDialog,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    if (!this.formGroup) {
      this.formGroup = this.formGroupService.createFormGroupFor('sell');
    }
    this.valueChangesSub = this.formGroup.valueChanges.pipe(
      debounceTime(100),
      tap(v => this.onChange(v))
    ).subscribe();
    this.sellDetails$ = this.service.sellDetails$.pipe();

    this.billingTypes$ = this.billingTypesDataApiService.fetchPage().pipe(map(page => page.items));
    this.salespeople$ = this.salespeopleDataService.fetchPage().pipe(map(page => page.items));
    this.customers$ = this.customersDataService.fetchPage().pipe(map(page => page.items));

    this.sellNetValueLabel$ = this.service.sellNetValue$.pipe(
      map(netValue => ($localize`:subtotal sell value|Label with sell subtotal value (products only) being {{ subtotalValue }}:Subtotal: ${ this.currencyPipe.transform(netValue) }:subtotalValue:`))
    );
    this.sellTotalValueLabel$ = this.service.sellTotalValue$.pipe(
      map(totalValue => ($localize`:total sell value|Label with sell total value (products, transport and taxes) being {{ totalValue }}:Total: ${ this.currencyPipe.transform(totalValue) }:totalValue:`))
    );

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

  ngOnDestroy(): void {
    this.valueChangesSub?.unsubscribe();
  }

  onChange(value: any): void { }
  onTouched(): void { }
  onValidatorChange(): void { }

  writeValue(obj: any): void {
    this.billingType.reset('', { emitEvent: false });
    this.salesperson.reset(null, { emitEvent: false });
    this.customer.reset(null, { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.formGroup.valid) {
      return null;
    }

    const errors = {} as ValidationErrors;

    if (this.billingType.errors) {
      errors.sellBillingType = this.billingType.errors;
    }
    if (this.salesperson.errors) {
      errors.sellSalesperson = this.salesperson.errors;
    }
    if (this.customer.errors) {
      errors.sellCustomer = this.customer.errors;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
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
