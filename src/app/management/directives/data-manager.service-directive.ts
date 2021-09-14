// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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

  public focusedItems$ = this.focusedItemsSource.asObservable();
  public items$ = this.itemsSource.asObservable();
  public loading$ = this.loadingSource.asObservable();

  public canEdit$: Observable<boolean>;
  public canAdd$: Observable<boolean>;
  public canDelete$: Observable<boolean>;

  constructor() {
    this.canEdit$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('update')));
    this.canAdd$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('create')));
    this.canDelete$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('delete')));
  }

  public get focusedItems(): T[] {
    return this.focusedItemsSource.getValue();
  }
  public set focusedItems(i: T[]) {
    this.focusedItemsSource.next(i);
  }

  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.itemsSource.complete();
    this.loadingSource.complete();
  }

  /** Empty item selections and fetch data from the external service again. */
  public reloadItems(): void {
    this.focusedItemsSource.next([]);
    this.loadingSource.next(true);
    this.dataService.fetchPage().pipe(
      delay(0),
      tap(response => { this.itemsSource.next(response.items); }),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

  /**
   * Update authorized access
   * @param authAccess The new value
   */
  public updateAccess(authAccess: AuthorizedAccess): void {
    this.authorizedAccessSource.next(authAccess);
  }


}
