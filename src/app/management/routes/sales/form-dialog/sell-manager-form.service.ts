// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { Client } from 'src/app/models/entities/Client';
import { Seller } from 'src/app/models/entities/Seller';
import { Product } from 'src/app/models/entities/Product';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { SellType } from 'src/app/models/entities/SellType';
import { CompositeEntityDataApiIService } from 'src/app/api/data/composite-entity-data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data/entity-data-api.iservice';
import { SharedDataApiIService } from 'src/app/api/data/shared-data-api.iservice';

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
    @Inject(API_SERVICE_INJECTION_TOKENS.salesCrud) protected dataService: CompositeEntityDataApiIService<Sell, SellDetail>,
    @Inject(API_SERVICE_INJECTION_TOKENS.productsCrud) protected productDataService: EntityDataApiIService<Product>,
    @Inject(API_SERVICE_INJECTION_TOKENS.clientsCrud) protected clientDataService: EntityDataApiIService<Client>,
    @Inject(API_SERVICE_INJECTION_TOKENS.sellersCrud) protected sellerDataService: EntityDataApiIService<Seller>,
    @Inject(API_SERVICE_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataApiIService,
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

  public getAllSellTypes(): Observable<SellType[]> {
    return this.sharedDataService.readAllSellTypes();
  }

  public getAllSellers(): Observable<Seller[]> {
    return this.sellerDataService.readAll();
  }

  public getAllClients(): Observable<Client[]> {
    return this.clientDataService.readAll();
  }

  public refreshSellDetailsFromId(id: number): void {
    this.dataService.readDetailsById(id).pipe(
      switchMap(sellDetails => from(sellDetails)),
      concatMap(
        detail => this.productDataService.readById(detail.product.id).pipe(
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
