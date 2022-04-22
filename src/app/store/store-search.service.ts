/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Params } from "@angular/router";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { finalize, ignoreElements, tap } from "rxjs/operators";
import { DataPage } from "src/models/DataPage";
import { Product } from "src/models/entities/Product";
import { ProductSearchQuery } from "src/models/ProductSearchQuery";
import { API_INJECTION_TOKENS } from "../api/api-injection-tokens";
import { ITransactionalEntityDataApiService } from "../api/transactional-entity.data-api.iservice";

@Injectable({ providedIn: 'root' })
export class StoreSearchService {

  private isLoadingSearchSource = new BehaviorSubject(false);
  private currentPageSource = new ReplaySubject<DataPage<Product>>(1);
  private searchQuery = new ProductSearchQuery();

  currentPage$ = this.currentPageSource.asObservable();
  isLoadingSearch$ = this.isLoadingSearchSource.asObservable();

  pageIndex = 0;
  pageSize = 8;
  sortBy = 'name';
  order = 'asc';

  constructor(
    @Inject(API_INJECTION_TOKENS.dataProducts) private productsApiService: ITransactionalEntityDataApiService<Product>
  ) { }

  updateSearchQuery(queryParams: Params) {
    if (queryParams?.nameLike || queryParams) {
      this.searchQuery.nameLike = queryParams.nameLike;
    } else {
      delete this.searchQuery.nameLike;
    }
    if (queryParams?.categoryCode) {
      this.searchQuery.categoryCode = queryParams.categoryCode;
    } else {
      delete this.searchQuery.categoryCode;
    }
  }

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return this.reload();
  }

  reload() {
    this.isLoadingSearchSource.next(true);
    return this.productsApiService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, this.searchQuery).pipe(
      tap(page => this.currentPageSource.next(page)),
      ignoreElements(),
      finalize(() => this.isLoadingSearchSource.next(false))
    );
  }
}
