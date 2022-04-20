/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { ProductsArrayDialogService } from './products-array-dialog.service';

@Component({
  selector: 'app-products-array-dialog',
  templateUrl: './products-array-dialog.component.html',
  styleUrls: ['./products-array-dialog.component.css'],
  providers: [ ProductsArrayDialogService ]
})
export class ProductsArrayDialogComponent
  implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;

  availableProducts$: Observable<Product[]>;
  totalCount$: Observable<number>;
  productsArray$: Observable<Product[]>;
  totalProducts$: Observable<number>;
  loading$: Observable<boolean>;
  isArrayEmpty$: Observable<boolean>;
  productTableColumns = ['name', 'barcode', 'price', 'actions'];
  pageSizeOptions = [ 10, 20, 50 ];

  constructor(
    private service: ProductsArrayDialogService,
  ) {
    this.availableProducts$ = this.service.availableProducts$.pipe();
    this.totalCount$ = this.service.totalCount$.pipe();
    this.loading$ = this.service.loading$.pipe();
    this.productsArray$ = this.service.productsArray$.pipe();
    this.totalProducts$ = this.service.productsArray$.pipe(map(arr => arr.length));
    this.isArrayEmpty$ = this.service.totalCount$.pipe(map(count => (count === 0)));
    this.service.pageSize = this.pageSizeOptions[0];
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  onFiltersChange(f: any): void {
    this.service.filters = f;
    this.reload();
  }

  onSortChange(event: Sort) {
    this.service.sortBy = event.active;
    this.service.order = event.direction;
    this.reload();
  }

  onClickIncludeProduct(p: Product): void {
    this.service.includeProduct(p);
  }

  onPage(event: PageEvent) {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.reload();
  }

  onClickDropProduct(i: number): void {
    this.service.dropProductByIndex(i);
  }

  reload() {
    this.loadingSubscription?.unsubscribe();
    this.loadingSubscription = this.service.reloadItems().subscribe();
  }

}
