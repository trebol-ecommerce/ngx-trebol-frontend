/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { ProductsArrayDialogComponent } from '../products-array/products-array-dialog.component';
import { ProductListContentsDialogService } from './product-list-contents-dialog.service';
import { ProductListContentsDialogData } from './ProductListContentsDialogData';

@Component({
  selector: 'app-product-list-contents-dialog',
  templateUrl: './product-list-contents-dialog.component.html',
  styleUrls: ['./product-list-contents-dialog.component.css'],
  providers: [ ProductListContentsDialogService ]
})
export class ProductListContentsDialogComponent
  implements OnInit, OnDestroy {

  private loadingSubscription: Subscription;
  private actionSubscription: Subscription

  productTableColumns = ['name', 'barcode', 'price', 'actions'];
  pageSizeOptions = [5, 10, 20, 50, 100];

  loading$: Observable<boolean>;
  products$: Observable<Product[]>;
  isArrayEmpty$: Observable<boolean>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductListContentsDialogData,
    private service: ProductListContentsDialogService,
    private dialog: MatDialog
  ) {
    this.service.list = this.data.list;
    this.service.pageSize = this.pageSizeOptions[0];
    this.loading$ = this.service.loading$.pipe();
    this.products$ = this.service.page$.pipe(map(page => page.items));
    this.totalCount$ = this.service.page$.pipe(map(page => page.totalCount));
    this.isArrayEmpty$ = this.products$.pipe(map(array => (array.length === 0)));
  }

  ngOnInit(): void {
    this.reload();
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
    this.actionSubscription?.unsubscribe();
  }

  onSortChange(sort: Sort): void {
    this.service.sortBy = sort.active;
    this.service.order = sort.direction;
    this.reload();
  }

  onPage(event: PageEvent): void {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.reload();
  }

  onClickAddProducts(): void {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.dialog.open(
      ProductsArrayDialogComponent,
      {
        maxHeight: '90vh'
      }
    ).afterClosed().pipe(
      switchMap((products?: Product[]) => (!!products && Array.isArray(products)) ?
        forkJoin(products.map(p => this.service.addProduct(p))) :
        of(void 0)
      ),
      finalize(() => this.reload())
    ).subscribe();
  }

  onClickChooseProducts(): void {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.dialog.open(
      ProductsArrayDialogComponent,
      {
        maxHeight: '90vh'
      }
    ).afterClosed().pipe(
      switchMap((products?: Product[]) => (!!products && Array.isArray(products)) ?
        this.service.replaceProductsWith(products) :
        of(void 0)
      ),
      finalize(() => this.reload())
    ).subscribe();
  }

  onClickRemoveProduct(p: Product): void {
    this.actionSubscription?.unsubscribe();
    this.actionSubscription = this.service.removeProduct(p).pipe(
      tap(() => this.reload())
    ).subscribe();
  }

  reload() {
    this.loadingSubscription?.unsubscribe();
    this.loadingSubscription = this.service.reloadItems().subscribe();
  }

}
