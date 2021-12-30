/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IProductListContentsDataApiService } from 'src/app/api/transactional-product-lists.data.api.iservice';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';

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

  products$: Observable<Product[]>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProductLists) private productListApiService: IProductListContentsDataApiService
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

  private reloadItems() {
    this.loadingSubscription?.unsubscribe();

    this.loadingSubscription = this.productListApiService.fetchContents(this.list, this.pageIndex, this.pageSize).pipe(
      tap(page => this.pageSource.next(page))
    ).subscribe();
  }

}
