/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { delay, finalize, map, tap } from 'rxjs/operators';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

@Directive()
export abstract class DataManagerServiceDirective<T>
  implements OnDestroy {

  protected abstract dataService: IEntityDataApiService<T>;

  protected focusedItemsSource = new BehaviorSubject<T[]>([]);
  protected itemsSource = new ReplaySubject<T[]>();
  protected loadingSource = new BehaviorSubject(false);
  protected authorizedAccessSource = new ReplaySubject<AuthorizedAccess>();

  focusedItems$ = this.focusedItemsSource.asObservable();
  items$ = this.itemsSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  canEdit$: Observable<boolean>;
  canAdd$: Observable<boolean>;
  canDelete$: Observable<boolean>;

  get focusedItems(): T[] { return this.focusedItemsSource.getValue(); }
  set focusedItems(i: T[]) { this.focusedItemsSource.next(i); }

  constructor() {
    this.canEdit$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('update')));
    this.canAdd$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('create')));
    this.canDelete$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('delete')));
  }

  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.itemsSource.complete();
    this.loadingSource.complete();
  }

  /** Empty item selections and fetch data from the external service again. */
  reloadItems(): void {
    this.focusedItemsSource.next([]);
    this.loadingSource.next(true);
    this.dataService.fetchPage().pipe(
      delay(1000),
      tap(response => { this.itemsSource.next(response.items); }),
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
