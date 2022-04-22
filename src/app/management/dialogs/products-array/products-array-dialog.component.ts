/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge, Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  private selectedProductsSub: Subscription;
  private selectionChangeSub: Subscription;
  private fetchingSubscription: Subscription;
  private actionSub: Subscription;

  pageSizeOptions = [10, 20, 50];
  productTableColumns = ['name', 'barcode', 'price', 'actions'];
  selectedProducts: Product[];
  loading$: Observable<boolean>;
  availableProducts$: Observable<Product[]>;
  totalCount$: Observable<number>;
  isArrayEmpty$: Observable<boolean>;

  @ViewChild('selectedProductsTable', { static: true }) selectedProductsTable: MatTable<Product>;

  constructor(
    private service: ProductsArrayDialogService
  ) { }

  ngOnInit(): void {
    this.selectedProductsSub = this.service.selectedProducts$.pipe(
      tap(v => {
        this.selectedProducts = v;
        if (v.length) {
          this.selectedProductsTable.renderRows();
        }
      })
    ).subscribe();
    this.loading$ = this.service.loading$.pipe();
    this.availableProducts$ = merge(
      of([]),
      this.service.page$.pipe(
        map(arr => arr.items)
      )
    );
    this.totalCount$ = this.service.page$.pipe(
      map(page => page.totalCount)
    );
    this.service.pageSize = this.pageSizeOptions[0];
    this.reload();
  }

  ngOnDestroy(): void {
    this.selectedProductsSub.unsubscribe();
    this.selectionChangeSub?.unsubscribe();
    this.fetchingSubscription?.unsubscribe();
    this.actionSub?.unsubscribe();
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

  onPage(event: PageEvent) {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.reload();
  }

  onClickIncludeProduct(p: Product): void {
    this.actionSub?.unsubscribe();
    this.actionSub = this.service.includeProduct(p).subscribe();
  }

  onClickDropProduct(p: Product): void {
    this.actionSub?.unsubscribe();
    this.actionSub = this.service.dropProduct(p).subscribe();
  }

  reload() {
    this.fetchingSubscription?.unsubscribe();
    this.fetchingSubscription = this.service.reloadItems().subscribe();
  }

}
