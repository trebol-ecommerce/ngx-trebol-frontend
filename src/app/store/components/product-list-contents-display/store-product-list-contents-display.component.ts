/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ITransactionalProductListContentsDataApiService } from 'src/app/api/transactional-product-list-contents.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreCatalogService } from '../../routes/catalog/store-catalog.service';

@Component({
  selector: 'app-store-product-list-contents-display',
  templateUrl: './store-product-list-contents-display.component.html',
  styleUrls: ['./store-product-list-contents-display.component.css']
})
export class StoreProductListContentsDisplayComponent
  implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  private pageSource = new ReplaySubject<DataPage<Product>>(1);

  @Input() list = new ProductList();

  @Output() addProductToCart = new EventEmitter<Product>();

  pageIndex = 0;
  pageSize = 10;
  page$ = this.pageSource.asObservable();

  loadingProducts = true;
  products$: Observable<Product[]>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProductLists) private productListApiService: ITransactionalProductListContentsDataApiService,
    private catalogService: StoreCatalogService
  ) {
    this.products$ = this.page$.pipe(map(page => page.items));
    this.totalCount$ = this.page$.pipe(map(page => page.totalCount));
  }

  ngOnInit(): void {
    this.reloadItems();
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.reloadItems();
  }

  onAddProductToCart(product: Product): void {
    this.addProductToCart.emit(product);
  }

  onViewProduct(product: Product): void {
    this.catalogService.navigateToProductDetails(product.barcode);
  }

  private reloadItems() {
    this.loadingProducts = true;
    this.loadingSubscription?.unsubscribe();
    this.loadingSubscription = this.productListApiService.fetchContents(
      this.list,
      {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
    ).pipe(
        tap(page => this.pageSource.next(page)),
        finalize(() => { this.loadingProducts = false; })
    ).subscribe();
  }

}
