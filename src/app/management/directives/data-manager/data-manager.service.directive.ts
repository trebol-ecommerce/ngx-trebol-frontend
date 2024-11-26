/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { AuthorizedAccess } from 'src/models/AuthorizedAccess';
import { DataPage } from 'src/models/DataPage';

@Directive()
export abstract class DataManagerServiceDirective<T>
  implements OnDestroy {

  protected abstract dataService: IEntityDataApiService<T>;

  protected focusedItemsSource = new BehaviorSubject<T[]>([]);
  protected pageSource = new ReplaySubject<DataPage<T>>();
  protected loadingSource = new BehaviorSubject(false);
  protected authorizedAccessSource = new ReplaySubject<AuthorizedAccess>();

  focusedItems$ = this.focusedItemsSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  items$: Observable<T[]>;
  totalCount$: Observable<number>;

  pageIndex: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  order: string | undefined;
  filters: any | undefined;

  get focusedItems(): T[] { return this.focusedItemsSource.getValue(); }
  set focusedItems(i: T[]) { this.focusedItemsSource.next(i); }

  constructor() {
    this.items$ = this.pageSource.asObservable().pipe(map(page => page.items));
    this.totalCount$ = this.pageSource.asObservable().pipe(map(page => page.totalCount));
  }

  // TODO services do not support lifecycle hooks such as this...
  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.pageSource.complete();
    this.loadingSource.complete();
  }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems() {
    this.focusedItemsSource.next([]);
    this.loadingSource.next(true);
    return this.dataService.fetchPage({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      order: this.order,
      filters: this.filters
    }).pipe(
      tap(page => { this.pageSource.next(page); }),
      finalize(() => { this.loadingSource.next(false); })
    );
  }


}
