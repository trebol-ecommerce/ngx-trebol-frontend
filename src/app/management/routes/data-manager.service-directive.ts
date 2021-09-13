// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, ReplaySubject } from 'rxjs';
import { catchError, delay, finalize, map, mapTo, mergeMap, startWith, tap, toArray } from 'rxjs/operators';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

/**
 * Base class for data manager services.
 * Through a final EntityCrudIService, this class brings the needed boilerplate for caching
 * model classes' instances and easily operate with their related CRUD API.
 */
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

  /** Delete items contained in the array one by one */
  public removeItems(items: T[]): Observable<boolean[]> {
    this.focusedItems = items;
    return from(items).pipe(
      mergeMap(item => this.dataService.delete(item).pipe(mapTo(true), catchError(() => of(false)))),
      toArray(),
      tap(
        (results) => {
          if (results.every(r => r)) {
            this.focusedItems = [];
          }
        }
      )
    );
  }

  /**
   * Update authorized access
   * @param authAccess The new value
   */
  public updateAccess(authAccess: AuthorizedAccess): void {
    this.authorizedAccessSource.next(authAccess);
  }


}
