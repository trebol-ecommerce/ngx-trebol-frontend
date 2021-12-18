/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/models/entities/Product';
import { ProductFilters } from "src/app/shared/components/product-filters-panel/ProductFilters";
import { StoreService } from '../../store.service';
import { StoreCatalogService } from './store-catalog.service';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.css']
})
export class StoreCatalogComponent
  implements OnInit {

  loading$: Observable<boolean>;
  products$: Observable<Product[]>;

  constructor(
    private catalogService: StoreCatalogService,
    private storeService: StoreService
  ) {
    this.loading$ = this.catalogService.loading$.pipe();
    this.products$ = this.catalogService.items$.pipe();
  }

  ngOnInit(): void {
    this.catalogService.reloadItems();
  }

  onFiltersChange(f: ProductFilters) {
    this.catalogService.filters = f;
    this.catalogService.reloadItems();
  }

  onAddProductToCart(p: Product) {
    this.storeService.addProductToCart(p);
  }
  onViewProduct(p: Product) {
    this.catalogService.viewProduct(p);
  }

}
