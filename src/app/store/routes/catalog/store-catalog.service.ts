// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { concatMap, delay, map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Product } from 'src/app/models/entities/Product';
import { IStoreApiService } from 'src/app/api/store-api.iservice';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { StoreProductDetailsDialogComponent, StoreProductDetailsDialogData } from '../../dialogs/product-details/store-product-details-dialog.component';
import { DataPage } from 'src/app/models/DataPage';
import { ICategoriesPublicApiService } from 'src/app/api/categories-public-api.iservice';

@Injectable()
export class StoreCatalogService
  implements OnDestroy {

  protected itemsSource: Subject<Product[]> = new BehaviorSubject(null);

  public items$: Observable<Product[]> = this.itemsSource.asObservable();
  public loading$: Observable<boolean>;

  public filters: ProductFilters = {};

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.products) protected storeApiService: IStoreApiService,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {
    this.loading$ = this.items$.pipe(map(items => (items === null)));
    this.checkRouteForProductIdParam();
  }

  public promptProductDetails(product: Product): Observable<any> {
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

  protected checkRouteForProductIdParam(): void {
    this.route.queryParamMap.subscribe(
      (params) => {
        if (params.has('barcode')) {
          const barcode = params.get('barcode');
          this.storeApiService.fetchProductByBarcode(barcode).pipe(
            concatMap(p => this.promptProductDetails(p))
          ).subscribe();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.itemsSource.complete();
  }

  public reloadItems(): void {
    this.itemsSource.next(null);

    let p: Observable<DataPage<Product>>;

    if (JSON.stringify(this.filters) !== '{}') {
      p = this.storeApiService.fetchFilteredProductCollection(this.filters);
    } else {
      p = this.storeApiService.fetchStoreFrontProductCollection();
    }

    p.pipe(
      delay(0)
    ).subscribe(
      response => { this.itemsSource.next(response.items); }
    );
  }

  public viewProduct(p: Product): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { barcode: p.barcode },
        queryParamsHandling: 'merge'
      }
    );
  }

}
