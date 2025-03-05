/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, ReplaySubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';

@Injectable()
export class ProductListContentsDialogService {

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
    @Inject(API_INJECTION_TOKENS.dataProductLists) private listApiService: ITransactionalProductListContentsDataApiService,
  ) { }

  reloadItems() {
    this.loadingSource.next(true);
    return this.listApiService.fetchContents(
      this.list,
      {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order
      }
    ).pipe(
      tap(page => this.pageSource.next(page)),
      finalize(() => this.loadingSource.next(false))
    );
  }

  addProduct(product: Product) {
    return this.list ?
      this.listApiService.addToContents(this.list, product) :
      EMPTY;
  }

  replaceProductsWith(products: Product[]) {
    return this.list ?
      this.listApiService.updateContents(this.list, products) :
      EMPTY;
  }

  removeProduct(product: Product) {
    return this.list ?
      this.listApiService.deleteFromContents(this.list, product) :
      EMPTY;
  }
}
