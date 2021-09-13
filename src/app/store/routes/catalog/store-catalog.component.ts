// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { StoreCatalogService } from './store-catalog.service';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.css']
})
export class StoreCatalogComponent
  implements OnInit {

  public loading$: Observable<boolean>;
  public products$: Observable<Product[]>;

  constructor(
    protected catalogService: StoreCatalogService,
    protected storeService: StoreService
  ) {
    this.loading$ = this.catalogService.loading$.pipe();
    this.products$ = this.catalogService.items$.pipe();
  }

  ngOnInit(): void {
    this.catalogService.reloadItems();
  }

  public onFiltersChange(f: ProductFilters) {
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
