/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';

@Injectable({ providedIn: 'root' })
export class ProductsArrayService {

  private productsArray: Product[] = [];

  private productsArraySource = new BehaviorSubject([]);
  private productFiltersSource = new BehaviorSubject({});

  productsArray$ = this.productsArraySource.asObservable();

  loading$: Observable<boolean>;
  filteredProductsArray$: Observable<Product[]>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private productDataService: IEntityDataApiService<Product>,
  ) {
    this.filteredProductsArray$ = this.productFiltersSource.asObservable().pipe(
      concatMap(
        (filters: ProductFilters) => {
          if (JSON.stringify(filters) !== '{}') {
            return this.productDataService.fetchPageFilteredBy(filters);
          } else {
            return this.productDataService.fetchPage();
          }
        }
      ),
      map(response => response.items)
    );

    this.loading$ = merge(
      this.productFiltersSource.asObservable().pipe(mapTo(true)),
      this.filteredProductsArray$.pipe(mapTo(false))
    );
  }

  changeFiltersTo(filters: ProductFilters): void {
    this.productFiltersSource.next(filters);
  }

  includeProduct(prod: Product): void {
    this.productsArray.push(prod);
    this.productsArraySource.next(this.productsArray);
  }

  dropProductByIndex(index: number): void {
    this.productsArray.splice(index, 1);
    this.productsArraySource.next(this.productsArray);
  }
}
