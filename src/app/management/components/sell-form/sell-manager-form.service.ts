/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Product } from 'src/models/entities/Product';
import { Sell } from 'src/models/entities/Sell';
import { SellDetail } from 'src/models/entities/SellDetail';

@Injectable({ providedIn: 'root' })
export class SellFormService
  implements OnDestroy {

  private sellDetails: SellDetail[] = [];
  private sellDetailsSource: Subject<SellDetail[]> = new BehaviorSubject([]);

  sellDetails$: Observable<SellDetail[]> = this.sellDetailsSource.asObservable();
  sellNetValue$: Observable<number>;
  sellTotalValue$: Observable<number>;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataSales) private dataService: ICompositeEntityDataApiService<Sell, SellDetail>,
    @Inject(API_INJECTION_TOKENS.dataProducts) private productDataService: ITransactionalEntityDataApiService<Product>,
  ) {
    this.sellNetValue$ = this.sellDetails$.pipe(
      map(
        array => {
          if (array.length === 0) { return 0; }
          return array.map(detail => detail.product.price * detail.units).reduce((a, b) => a + b);
        }
      )
    );
    this.sellTotalValue$ = this.sellNetValue$.pipe(map(subtotal => Math.ceil(subtotal * 1.19)));
  }

  ngOnDestroy(): void {
    this.sellDetailsSource.complete();
  }

  refreshSellDetailsFrom(sell: Partial<Sell>): void {
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

  addProducts(newProducts: Product[]): void {
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

  increaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units++;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  decreaseDetailProductQuantityAtIndex(i: number): void {
    const detail: SellDetail = this.sellDetails[i];
    if (detail) {
      detail.units--;
      this.sellDetailsSource.next(this.sellDetails);
    }
  }

  removeDetailAtIndex(i: number) {
    this.sellDetails.splice(i, 1);
    this.sellDetailsSource.next(this.sellDetails);
  }

}
