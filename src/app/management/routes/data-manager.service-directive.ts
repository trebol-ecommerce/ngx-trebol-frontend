// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, ReplaySubject } from 'rxjs';
import { catchError, delay, finalize, map, mapTo, mergeMap, startWith, tap, toArray } from 'rxjs/operators';
import { EntityDataApiIService } from 'src/app/api/entity-data-api.iservice';
import { AbstractEntity } from 'src/app/models/AbstractEntity';
import { AuthorizedAccess } from 'src/app/models/AuthorizedAccess';

/**
 * Base class for data manager services.
 * Through a final EntityCrudIService, this class brings the needed boilerplate for caching
 * model classes' instances and easily operate with their related CRUD API.
 */
@Directive()
export abstract class DataManagerServiceDirective<T extends AbstractEntity>
  implements OnDestroy {

  protected abstract dataService: EntityDataApiIService<T>;

  protected focusedItemsSource: Subject<T[]> = new BehaviorSubject([]);
  protected itemsSource: Subject<T[]> = new ReplaySubject();
  protected loadingSource: Subject<boolean> = new BehaviorSubject(false);
  protected authorizedAccessSource: Subject<AuthorizedAccess> = new ReplaySubject();

  public focusedItems$: Observable<T[]> = this.focusedItemsSource.asObservable();
  public items$: Observable<T[]> = this.itemsSource.asObservable();
  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  public canEdit$: Observable<boolean>;
  public canAdd$: Observable<boolean>;
  public canDelete$: Observable<boolean>;

  constructor() {
    this.canEdit$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('update')));
    this.canAdd$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('create')));
    this.canDelete$ = this.authorizedAccessSource.asObservable().pipe(map(a => a?.permissions?.includes('delete')));
  }

  public get focusedItems(): T[] {
    return (this.focusedItemsSource as BehaviorSubject<T[]>)?.getValue();
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
    this.dataService.readAll().pipe(
      delay(0),
      tap(items => { this.itemsSource.next(items); }),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

  /** Delete items contained in the array one by one */
  public removeItems(items: T[]): Observable<boolean[]> {
    this.focusedItems = items;
    return from(items).pipe(
      mergeMap(item => this.dataService.deleteById(item.id).pipe(mapTo(true), catchError(() => of(false)))),
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
