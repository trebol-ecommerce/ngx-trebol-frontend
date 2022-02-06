/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';

@Injectable()
export class ProductListContentsDialogService
  implements OnDestroy {

  private loadingSubscription: Subscription;

  private pageSource = new ReplaySubject<DataPage<Product>>(1);
  private loadingSource = new BehaviorSubject(false);

  page$ = this.pageSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  pageIndex = 0;
  pageSize = 10;
  sortBy = '';
  order = '';
  list: ProductList | null;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductLists) private listApiService: ITransactionalProductListContentsDataApiService,
  ) {
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
    this.pageSource.complete();
    this.loadingSource.complete();
  }

  reloadItems(): void {
    this.loadingSource.next(true);
    this.loadingSubscription?.unsubscribe();
    this.loadingSubscription = this.listApiService.fetchContents(this.list, this.pageIndex, this.pageSize, this.sortBy, this.order).pipe(
      tap(page => this.pageSource.next(page)),
      finalize(() => this.loadingSource.next(false))
    ).subscribe();
  }

  addProduct(product: Product) {
    return this.listApiService.addToContents(this.list, product);
  }

  replaceProductsWith(products: Product[]) {
    return this.listApiService.updateContents(this.list, products);
  }

  removeProduct(product: Product) {
    return this.listApiService.deleteFromContents(this.list, product);
  }
}
