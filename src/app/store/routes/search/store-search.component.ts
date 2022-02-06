/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/models/entities/Product';
import { StoreCartService } from '../../store-cart.service';
import { StoreSearchService } from '../../store-search.service';
import { StoreCatalogService } from '../catalog/store-catalog.service';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css']
})
export class StoreSearchComponent
  implements OnInit, OnDestroy {

  private reloadSub: Subscription;

  isLoadingSearch$: Observable<boolean>;
  searchResults$: Observable<Product[]>;
  totalCount$: Observable<number>;

  constructor(
    private searchService: StoreSearchService,
    private cartService: StoreCartService,
    private catalogService: StoreCatalogService
  ) {
    this.isLoadingSearch$ = this.searchService.isLoadingSearch$.pipe();
    this.searchResults$ = this.searchService.currentPage$.pipe(
      map(page => (page.items as Product[]))
    );
    this.totalCount$ = this.searchService.currentPage$.pipe(
      map(page => page.totalCount)
    );
    this.searchService.readQueryParams();
  }

  ngOnInit(): void {
    this.reloadSub = this.searchService.reload().subscribe();
  }

  ngOnDestroy(): void {
    this.reloadSub?.unsubscribe();
  }

  onPage(event: PageEvent): void {
    this.reloadSub?.unsubscribe();
    this.reloadSub = this.searchService.paginate(event).subscribe();
  }

  onAddProductToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  onViewProduct(product: Product): void {
    this.catalogService.viewProduct(product);
  }

}
