// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable, Inject } from '@angular/core';
import { Product } from 'src/app/data/models/entities/Product';
import { Subject, BehaviorSubject, Observable, merge } from 'rxjs';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { concatMap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsArrayService {

  protected productsArray: Product[] = [];

  protected productsArraySource: Subject<Product[]> = new BehaviorSubject([]);
  protected productFiltersSource: Subject<ProductFilters> = new BehaviorSubject({});

  public productsArray$: Observable<Product[]> = this.productsArraySource.asObservable();
  public loading$: Observable<boolean>;
  public filteredProductsArray$: Observable<Product[]>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.productsCrud) protected productDataService: EntityCrudIService<Product>,
  ) {
    this.filteredProductsArray$ = this.productFiltersSource.asObservable().pipe(
      concatMap(
        (filters: ProductFilters) => {
          if (JSON.stringify(filters) !== '{}') {
            return this.productDataService.readFiltered(filters);
          } else {
            return this.productDataService.readAll();
          }
        }
      )
    );

    this.loading$ = merge(
      this.productFiltersSource.asObservable().pipe(mapTo(true)),
      this.filteredProductsArray$.pipe(mapTo(false))
    );
  }

  public changeFiltersTo(filters: ProductFilters): void {
    this.productFiltersSource.next(filters);
  }

  public includeProduct(prod: Product): void {
    this.productsArray.push(prod);
    this.productsArraySource.next(this.productsArray);
  }

  public dropProductByIndex(index: number): void {
    this.productsArray.splice(index, 1);
    this.productsArraySource.next(this.productsArray);
  }
}
