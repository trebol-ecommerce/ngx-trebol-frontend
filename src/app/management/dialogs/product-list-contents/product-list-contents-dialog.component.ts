/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { ProductListContentsDialogService } from './product-list-contents-dialog.service';
import { ProductListContentsDialogData } from './ProductListContentsDialogData';

@Component({
  selector: 'app-product-list-contents-dialog',
  templateUrl: './product-list-contents-dialog.component.html',
  styleUrls: ['./product-list-contents-dialog.component.css'],
  providers: [ ProductListContentsDialogService ]
})
export class ProductListContentsDialogComponent
  implements OnInit {

  productTableColumns = ['name', 'code', 'actions'];
  pageSizeOptions = [5, 10, 20, 50, 100];

  loading$: Observable<boolean>;
  products$: Observable<Product[]>;
  isArrayEmpty$: Observable<boolean>;
  totalCount$: Observable<number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductListContentsDialogData,
    private service: ProductListContentsDialogService,
  ) {
    this.service.list = this.data.list;
    this.loading$ = this.service.loading$.pipe();
    this.products$ = this.service.page$.pipe(map(page => page.items));
    this.totalCount$ = this.service.page$.pipe(map(page => page.totalCount));
    this.isArrayEmpty$ = this.products$.pipe(map(array => (array.length === 0)));
  }

  ngOnInit(): void {
    this.service.reloadItems();
  }

  onSortChange(sort: Sort): void {
    this.service.sortBy = sort.active;
    this.service.order = sort.direction;
    this.service.reloadItems();
  }

  onPage(event: PageEvent): void {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.service.reloadItems();
  }

  onClickAddProducts(): void {
  }

  onClickChooseProducts(): void {
  }

  onClickRemoveProduct(p: Product): void {
    this.service.removeProduct(p).pipe(
      tap(() => this.service.reloadItems())
    ).subscribe();
  }

}
