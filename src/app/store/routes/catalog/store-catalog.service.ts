/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, delay, map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductsPublicApiService } from 'src/app/api/products-public-api.iservice';
import { DataPage } from 'src/app/models/DataPage';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from "src/app/shared/components/product-filters-panel/ProductFilters";
import { StoreProductDetailsDialogComponent, StoreProductDetailsDialogData } from '../../dialogs/product-details/store-product-details-dialog.component';

@Injectable()
export class StoreCatalogService
  implements OnDestroy {

  private itemsSource = new BehaviorSubject(null);

  items$ = this.itemsSource.asObservable();
  loading$: Observable<boolean>;

  filters: ProductFilters = {};

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.products) private productsApiService: IProductsPublicApiService,
    private dialogService: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.loading$ = this.items$.pipe(map(items => (items === null)));
    this.checkRouteForProductIdParam();
  }

  ngOnDestroy(): void {
    this.itemsSource.complete();
  }

  reloadItems(): void {
    this.itemsSource.next(null);

    let p: Observable<DataPage<Product>>;

    if (JSON.stringify(this.filters) !== '{}') {
      p = this.productsApiService.fetchFilteredProductCollection(this.filters);
    } else {
      p = this.productsApiService.fetchStoreFrontProductCollection();
    }

    p.pipe(
      delay(0)
    ).subscribe(
      response => { this.itemsSource.next(response.items); }
    );
  }

  viewProduct(p: Product): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { barcode: p.barcode },
        queryParamsHandling: 'merge'
      }
    );
  }

  private checkRouteForProductIdParam(): void {
    this.route.queryParamMap.subscribe(
      (params) => {
        if (params.has('barcode')) {
          const barcode = params.get('barcode');
          this.productsApiService.fetchProductByBarcode(barcode).pipe(
            concatMap(p => this.promptProductDetails(p))
          ).subscribe();
        }
      }
    );
  }

  private promptProductDetails(product: Product): Observable<any> {
    const dialogData: StoreProductDetailsDialogData = { product };
    return this.dialogService.open(
      StoreProductDetailsDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed().pipe(
      tap(() => {
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: {}
          }
        );
      })
    );
  }

}
