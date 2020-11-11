// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Client } from 'src/app/models/entities/Client';
import { Seller } from 'src/app/models/entities/Seller';
import { Product } from 'src/app/models/entities/Product';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { SellType } from 'src/app/models/entities/SellType';
import { CompositeEntityCrudIService } from 'src/app/data/composite-entity.crud.iservice';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';

@Injectable()
export class SellManagerFormService
  extends DataManagerFormService<Sell>
  implements OnDestroy {

  protected sellDetails: SellDetail[] = [];
  protected sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  public sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  public sellSubtotalValue$: Observable<number>;
  public sellTotalValue$: Observable<number>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.salesCrud) protected dataService: CompositeEntityCrudIService<Sell, SellDetail>,
    @Inject(DATA_INJECTION_TOKENS.productsCrud) protected productDataService: EntityCrudIService<Product>,
    @Inject(DATA_INJECTION_TOKENS.clientsCrud) protected clientDataService: EntityCrudIService<Client>,
    @Inject(DATA_INJECTION_TOKENS.sellersCrud) protected sellerDataService: EntityCrudIService<Seller>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
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
