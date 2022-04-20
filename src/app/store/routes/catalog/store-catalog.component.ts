/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreProductDetailsDialogComponent } from '../../dialogs/product-details/store-product-details-dialog.component';
import { StoreProductDetailsDialogData } from '../../dialogs/product-details/StoreProductDetailsDialogData';
import { StoreCartService } from '../../store-cart.service';
import { StoreCatalogService } from './store-catalog.service';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.css']
})
export class StoreCatalogComponent
  implements OnInit, OnDestroy {

  private dataLoadingSubscription: Subscription;
  private queryParamsSubscription: Subscription;

  readonly storeCatalogTopBannerImages = environment.staticImages.topBanners;
  readonly storeCatalogBottomBannerImages = environment.staticImages.bottomBanners;
  loading$: Observable<boolean>;
  lists$: Observable<ProductList[]>;

  constructor(
    private catalogService: StoreCatalogService,
    private cartService: StoreCartService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loading$ = this.catalogService.loading$.pipe();
    this.lists$ = this.catalogService.listsPage$.pipe(map(page => page.items));
    this.dataLoadingSubscription = this.catalogService.reloadItems().subscribe();
    this.queryParamsSubscription = this.route.queryParamMap.pipe(
      switchMap(params => this.checkViewingProductParam(params))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.dataLoadingSubscription?.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }

  onAddProductToCart(p: Product) {
    this.cartService.addProductToCart(p);
  }
  onViewProduct(p: Product) {
    this.catalogService.navigateToProductDetails(p.barcode);
  }

  private checkViewingProductParam(params: ParamMap) {
    if (params.has('viewingProduct')) {
      const barcode = params.get('viewingProduct');
      return this.catalogService.fetchProductDetails(barcode).pipe(
        switchMap(p => this.promptProductDetails(p)),
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
    };
  }


  private promptProductDetails(product: Product): Observable<any> {
    const dialogData: StoreProductDetailsDialogData = { product };
    return this.dialogService.open(
      StoreProductDetailsDialogComponent,
      {
        width: '40rem',
        data: dialogData
      }
    ).afterClosed();
  }

}
