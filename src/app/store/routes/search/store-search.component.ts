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
import { StoreCartService } from '../../store-cart.service';
import { StoreSearchService } from '../../store-search.service';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css']
})
export class StoreSearchComponent
  implements OnInit {

  isLoadingSearch$: Observable<boolean>;
  searchResults$: Observable<Product[]>;
  totalCount$: Observable<number>;

  constructor(
    private searchService: StoreSearchService,
    private cartService: StoreCartService
  ) {
    this.isLoadingSearch$ = this.searchService.isLoadingSearch$.pipe();
    this.searchResults$ = this.searchService.currentPage$.pipe(
      map(page => (page.items as Product[]))
    );
    this.totalCount$ = this.searchService.currentPage$.pipe(
      map(page => page.totalCount)
    );
  }

  ngOnInit(): void {
    this.searchService.reload();
  }

  onPage(event: PageEvent): void {
    this.searchService.paginate(event);
  }

  onAddProductToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }
}
