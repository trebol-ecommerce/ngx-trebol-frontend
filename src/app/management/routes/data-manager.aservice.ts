import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, ReplaySubject } from 'rxjs';
import { catchError, delay, finalize, map, mapTo, mergeMap, startWith, tap, toArray } from 'rxjs/operators';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { AuthorizedAccess } from 'src/app/data/models/AuthorizedAccess';

@Directive()
export abstract class DataManagerService<T extends AbstractEntity>
  implements OnDestroy {

  protected abstract dataService: EntityCrudIService<T>;

  protected focusedItemsSource: Subject<T[]> = new BehaviorSubject([]);
  protected itemsSource: Subject<T[]> = new ReplaySubject();
  protected loadingSource: Subject<boolean> = new BehaviorSubject(false);
  protected authorizedAccessSource: Subject<AuthorizedAccess> = new ReplaySubject();

  public focusedItems$: Observable<T[]> = this.focusedItemsSource.asObservable();
  public items$: Observable<T[]> = this.itemsSource.asObservable();
  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  public canEdit$: Observable<boolean> = this.authorizedAccessSource.asObservable().pipe(
    map(a => (a?.permissions ? a.permissions.includes('update') : false)));
  public canAdd$: Observable<boolean> = this.authorizedAccessSource.asObservable().pipe(
    map(a => (a?.permissions ? a.permissions.includes('create') : false)));
  public canDelete$: Observable<boolean> = this.authorizedAccessSource.asObservable().pipe(
    map(a => (a?.permissions ? a.permissions.includes('delete') : false)));

  public get focusedItems(): T[] {
    return (this.focusedItemsSource as BehaviorSubject<T[]>).getValue();
  }
  public set focusedItems(i: T[]) {
    this.focusedItemsSource.next(i);
  }

  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.itemsSource.complete();
    this.loadingSource.complete();
  }

  public reloadItems(): void {
    this.focusedItemsSource.next([]);
    this.loadingSource.next(true);
    this.dataService.readAll().pipe(
      delay(0),
      tap(items => { this.itemsSource.next(items); }),
      finalize(() => { this.loadingSource.next(false); })
    ).subscribe();
  }

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

  public updateAccess(authAccess: AuthorizedAccess): void {
    this.authorizedAccessSource.next(authAccess);
  }


}
