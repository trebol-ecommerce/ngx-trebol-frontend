/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, ReplaySubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';

@Injectable()
export class StoreCatalogService {

  private loadingSource = new BehaviorSubject(false);
  private listsPageSource = new ReplaySubject<DataPage<ProductList>>(1);

  listsPage$ = this.listsPageSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  listIndex = 0;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProductLists) private productListApiService: ITransactionalProductListContentsDataApiService,
    @Inject(API_INJECTION_TOKENS.dataProducts) private productsApiService: ITransactionalEntityDataApiService<Product>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  reloadItems() {
    this.loadingSource.next(true);

    return this.productListApiService.fetchPage(this.listIndex).pipe(
      tap(page => this.listsPageSource.next(page)),
      finalize(() => this.loadingSource.next(false))
    );
  }

  navigateToProductDetails(productBarcode: string) {
    return from(this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { viewingProduct: productBarcode },
        queryParamsHandling: 'merge'
      }
    ));
  }

  fetchProductDetails(barcode: string) {
    return this.productsApiService.fetchExisting({
      barcode
    });
  }

}
