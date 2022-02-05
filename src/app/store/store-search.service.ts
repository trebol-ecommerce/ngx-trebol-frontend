/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, from, ReplaySubject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { DataPage } from "src/models/DataPage";
import { Product } from "src/models/entities/Product";
import { ProductSearchQuery } from "src/models/ProductSearchQuery";
import { API_SERVICE_INJECTION_TOKENS } from "../api/api-service-injection-tokens";
import { ITransactionalEntityDataApiService } from "../api/transactional-entity.data-api.iservice";

@Injectable({ providedIn: 'root' })
export class StoreSearchService
  implements OnDestroy {

  private isLoadingSearchSource = new BehaviorSubject(false);
  private currentPageSource = new ReplaySubject<DataPage<Product>>(1);

  searchQuery = new ProductSearchQuery();
  pageIndex = 0;
  pageSize = 8;
  sortBy = 'name';
  order = 'asc';

  readonly currentPage$ = this.currentPageSource.asObservable();
  readonly isLoadingSearch$ = this.isLoadingSearchSource.asObservable();

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private productsApiService: ITransactionalEntityDataApiService<Product>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.readQueryParams();
  }

  ngOnDestroy(): void {
    this.isLoadingSearchSource.complete();
    this.currentPageSource.complete();
  }

  readQueryParams() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.nameLike || queryParams) {
      this.searchQuery.nameLike = queryParams.nameLike;
    }
    if (queryParams.categoryCode) {
      this.searchQuery.categoryCode = queryParams.categoryCode;
    }
  }

  paginate(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    return this.reload();
  }

  reload() {
    const finalFilterObject: Partial<ProductSearchQuery> = {};
    if (this.searchQuery?.nameLike) {
      finalFilterObject.nameLike = this.searchQuery.nameLike;
    } else if (this.route.snapshot.queryParamMap.has('nameLike')) {
      finalFilterObject.nameLike = undefined;
    }
    if (this.searchQuery?.categoryCode) {
      finalFilterObject.categoryCode = this.searchQuery.categoryCode;
    }
    return from(this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: finalFilterObject,
        queryParamsHandling: ""
      }
    )).pipe(
      tap(() => this.isLoadingSearchSource.next(true)),
      switchMap(() => this.productsApiService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, finalFilterObject)),
      tap(page => {
        this.currentPageSource.next(page);
        this.isLoadingSearchSource.next(false);
      })
    );
  }
}
