/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { StoreCartService } from '../../store-cart.service';
import { StoreCatalogService } from './store-catalog.service';

@Component({
  selector: 'app-store-catalog',
  templateUrl: './store-catalog.component.html',
  styleUrls: ['./store-catalog.component.css']
})
export class StoreCatalogComponent
  implements OnInit {

  readonly storeCatalogTopBannerImages = environment.staticImages.topBanners;
  readonly storeCatalogBottomBannerImages = environment.staticImages.bottomBanners;
  loading$: Observable<boolean>;
  lists$: Observable<ProductList[]>;

  constructor(
    private catalogService: StoreCatalogService,
    private cartService: StoreCartService
  ) {
    this.loading$ = this.catalogService.loading$.pipe();
    this.lists$ = this.catalogService.lists$.pipe();
  }

  ngOnInit(): void {
    this.catalogService.reloadItems();
  }

  onAddProductToCart(p: Product) {
    this.cartService.addProductToCart(p);
  }
  onViewProduct(p: Product) {
    this.catalogService.viewProduct(p);
  }

}
