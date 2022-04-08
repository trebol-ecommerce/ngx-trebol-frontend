/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { delay, finalize, map, tap } from 'rxjs/operators';
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
  protected fetchingSubscription: Subscription;

  focusedItems$ = this.focusedItemsSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  items$: Observable<T[]>;
  totalCount$: Observable<number>;
  canEdit$: Observable<boolean>;
  canAdd$: Observable<boolean>;
  canDelete$: Observable<boolean>;

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
    this.canEdit$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('update')));
    this.canAdd$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('create')));
    this.canDelete$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('delete')));
  }

  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.pageSource.complete();
    this.loadingSource.complete();
    this.fetchingSubscription?.unsubscribe();
  }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems(): void {
    this.fetchingSubscription?.unsubscribe();
    this.focusedItemsSource.next([]);
    this.loadingSource.next(true);
    this.fetchingSubscription = this.dataService.fetchPage(this.pageIndex, this.pageSize, this.sortBy, this.order, this.filters).pipe(
      tap(page => { this.pageSource.next(page); }),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

  /**
   * Update authorized access
   * @param authAccess The new value
   */
  updateAccess(authAccess: AuthorizedAccess): void {
    this.authorizedAccessSource.next(authAccess);
  }


}
