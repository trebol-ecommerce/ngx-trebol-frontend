/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { concatMap, finalize, map, switchMap, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreProductDetailsDialogComponent } from '../../dialogs/product-details/store-product-details-dialog.component';
import { StoreProductDetailsDialogData } from "../../dialogs/product-details/StoreProductDetailsDialogData";

@Injectable()
export class StoreCatalogService
  implements OnDestroy {

  private queryParamsSubscription: Subscription;
  private loadingSubscription: Subscription;
  private loadingSource = new BehaviorSubject(false);
  private listsPageSource = new ReplaySubject<DataPage<ProductList>>(1);

  listsPage$ = this.listsPageSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  listIndex = 0;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductLists) private productListApiService: ITransactionalProductListContentsDataApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private productsApiService: ITransactionalEntityDataApiService<Product>,
    private dialogService: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.checkRouteForProductIdParam();
  }


  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
    this.loadingSource.complete();
    this.listsPageSource.complete();
  }

  reloadItems(): void {
    this.loadingSubscription?.unsubscribe();
    this.loadingSource.next(true);

    this.loadingSubscription = this.productListApiService.fetchPage(this.listIndex).pipe(
      tap(page => this.listsPageSource.next(page)),
      finalize(() => this.loadingSource.next(false))
    ).subscribe();
  }

  viewProduct(p: Product): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { viewingProduct: p.barcode },
        queryParamsHandling: 'merge'
      }
    );
  }

  private checkRouteForProductIdParam(): void {
    this.queryParamsSubscription = this.route.queryParamMap.pipe(
      switchMap((params) => (params.has('viewingProduct')) ?
        this.productsApiService.fetchExisting({
          barcode: params.get('viewingProduct')
        }).pipe(
          switchMap(p => this.promptProductDetails(p))
        ) :
        of(params)
      )
    ).subscribe();
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
      tap(() => this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {
            viewingProduct: undefined
          },
          queryParamsHandling: 'merge'
        }
      ))
    );
  }

}
