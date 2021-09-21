/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { ProductsArrayService } from './products-array.service';

@Component({
  selector: 'app-products-array-dialog',
  templateUrl: './products-array-dialog.component.html',
  styleUrls: [ './products-array-dialog.component.css' ]
})
export class ProductsArrayDialogComponent
  implements OnInit {

  filteredProductsArray$: Observable<Product[]>;
  productsArray$: Observable<Product[]>;
  loading$: Observable<boolean>;
  isArrayEmpty$: Observable<boolean>;
  productTableColumns = [ 'name', 'price', 'actions' ];

  constructor(
    private service: ProductsArrayService,
  ) {
    this.productsArray$ = this.service.productsArray$.pipe();
    this.isArrayEmpty$ = this.productsArray$.pipe(map(array => (array.length === 0)));
  }

  ngOnInit(): void {
    this.filteredProductsArray$ = this.service.filteredProductsArray$.pipe();
    this.loading$ = this.service.loading$.pipe();
  }

  onFiltersChange(f: ProductFilters): void {
    this.service.changeFiltersTo(f);
  }

  onClickIncludeProduct(p: Product): void {
    this.service.includeProduct(p);
  }

  onClickDropProduct(i: number): void {
    this.service.dropProductByIndex(i);
  }

}
