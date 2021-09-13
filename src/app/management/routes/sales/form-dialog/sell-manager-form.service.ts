// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { Customer } from 'src/app/models/entities/Customer';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { Product } from 'src/app/models/entities/Product';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { BillingType } from 'src/app/models/entities/BillingType';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { IUserRolesDataApiService } from 'src/app/api/user-roles.data-api.iservice';
import { IBillingTypesDataApiService } from 'src/app/api/billing-types.data-api.iservice';

@Injectable()
export class SellManagerFormService
  extends DataManagerFormServiceDirective<Sell>
  implements OnDestroy {

  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSales) protected dataService: ICompositeEntityDataApiService<Sell, SellDetail>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) protected productDataService: IEntityDataApiService<Product>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataCustomers) protected customersDataService: IEntityDataApiService<Customer>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSalespeople) protected salespeopleDataService: IEntityDataApiService<Salesperson>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataShared) protected sharedDataService: IUserRolesDataApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataBillingTypes) protected billingTypesDataApiService: IBillingTypesDataApiService
  ) {
    super();

    this.sellSubtotalValue$ = this.sellDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(detail => detail.product.price * detail.units).reduce((a, b) => a + b);
        }
      )
    );
    this.sellTotalValue$ = this.sellSubtotalValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  getAllBillingTypes(): Observable<BillingType[]> {
    return this.billingTypesDataApiService.readAllBillingTypes();
  }

  public getAllSalespeople(): Observable<Salesperson[]> {
    return this.salespeopleDataService.fetchPage().pipe(map(response => response.items));
  }

  public getAllCustomers(): Observable<Customer[]> {
    return this.customersDataService.fetchPage().pipe(map(response => response.items));
  }

  public refreshSellDetailsFrom(sell: Partial<Sell>): void {
    this.dataService.fetchInnerDataFrom(sell).pipe(
      switchMap(sellDetails => from(sellDetails)),
      concatMap(
        detail => this.productDataService.fetchExisting(detail.product).pipe(
          map((product) => {
            detail.product = product;
            return detail;
          })
        )
      ),
      toArray()
    ).subscribe(
      sellDetails => {
        this.sellDetails = sellDetails;
        this.sellDetailsSource.next(sellDetails);
      }
    );
  }

  public addProducts(newProducts: Product[]): void {
    const newSellDetails: SellDetail[] = newProducts.map(
      product => Object.assign<SellDetail, Partial<SellDetail>>(
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

  public increaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units++;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public decreaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units--;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  public removeDetailAtIndex(i: number) {
    this.sellDetails.splice(i, 1);
    this.sellDetailsSource.next(this.sellDetails);
  }

}
