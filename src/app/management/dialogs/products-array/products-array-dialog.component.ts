/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { ProductsArrayService } from './products-array.service';

@Component({
  selector: 'app-products-array-dialog',
  templateUrl: './products-array-dialog.component.html',
  styleUrls: ['./products-array-dialog.component.css'],
  providers: [ ProductsArrayService ]
})
export class ProductsArrayDialogComponent
  implements OnInit {

  availableProducts$: Observable<Product[]>;
  totalCount$: Observable<number>;
  productsArray$: Observable<Product[]>;
  loading$: Observable<boolean>;
  isArrayEmpty$: Observable<boolean>;
  productTableColumns = ['name', 'barcode', 'price', 'actions'];
  pageSizeOptions = [ 10, 20, 50 ];

  constructor(
    private service: ProductsArrayService,
  ) {
    this.availableProducts$ = this.service.availableProducts$.pipe();
    this.totalCount$ = this.service.totalCount$.pipe();
    this.loading$ = this.service.loading$.pipe();
    this.productsArray$ = this.service.productsArray$.pipe();
    this.isArrayEmpty$ = this.service.totalCount$.pipe(map(count => (count === 0)));
  }

  ngOnInit(): void {
    this.service.reloadItems();
  }

  onFiltersChange(f: any): void {
    this.service.filters = f;
    this.service.reloadItems();
  }

  onClickIncludeProduct(p: Product): void {
    this.service.includeProduct(p);
  }

  onPage(event: PageEvent) {
    this.service.pageIndex = event.pageIndex;
    this.service.pageSize = event.pageSize;
    this.service.reloadItems();
  }

  onClickDropProduct(i: number): void {
    this.service.dropProductByIndex(i);
  }

}
