/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, ReplaySubject } from 'rxjs';
import { finalize, ignoreElements, take, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductSearchQuery } from 'src/models/ProductSearchQuery';

@Injectable()
export class ProductsArrayDialogService {

  private loadingSource = new BehaviorSubject(true);
  private pageSource = new ReplaySubject<DataPage<Product>>(1);
  private selectedProductsSource = new BehaviorSubject<Product[]>([]);

  loading$ = this.loadingSource.asObservable();
  page$ = this.pageSource.asObservable();
  selectedProducts$ = this.selectedProductsSource.asObservable();

  pageIndex = 0;
  pageSize: number;
  sortBy: string;
  order: string;
  filters: ProductSearchQuery;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProducts) private productDataService: IEntityDataApiService<Product>,
  ) { }

  reloadItems() {
    this.loadingSource.next(true);
    return this.productDataService.fetchPage({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      order: this.order,
      filters: this.filters
    }).pipe(
      tap(page => this.pageSource.next(page)),
      ignoreElements(),
      finalize(() => this.loadingSource.next(false))
    );
  }

  includeProduct(prod: Product) {
    return EMPTY.pipe(
      finalize(() => {
        const productArraySet = new Set([...this.selectedProductsSource.value, prod]);
        this.selectedProductsSource.next([...productArraySet.values()]);
      }
    ));
  }

  dropProduct(index: number) {
    return this.selectedProducts$.pipe(
      take(1),
      tap(selectedProducts => {
        selectedProducts.splice(index, 1);
        this.selectedProductsSource.next(selectedProducts);
      }),
      ignoreElements()
    );
  }
}
