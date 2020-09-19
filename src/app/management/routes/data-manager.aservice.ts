import { BehaviorSubject, from, Observable, Subject, of } from 'rxjs';
import { delay, finalize, mergeMap, tap, toArray, mapTo, catchError } from 'rxjs/operators';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { OnDestroy, Directive } from '@angular/core';

@Directive()
export abstract class DataManagerService<T extends AbstractEntity>
  implements OnDestroy {

  protected abstract dataService: EntityCrudIService<T>;

  protected currentFocusedItems: T[] = null;
  protected focusedItemsSource: Subject<T[]> = new BehaviorSubject(null);
  protected itemsSource: Subject<T[]> = new Subject();
  protected loadingSource: Subject<boolean> = new BehaviorSubject(false);

  public focusedItems$: Observable<T[]> = this.focusedItemsSource.asObservable();
  public items$: Observable<T[]> = this.itemsSource.asObservable();
  public loading$: Observable<boolean> = this.loadingSource.asObservable();

  public get focusedItems(): T[] {
    return this.currentFocusedItems;
  }
  public set focusedItems(i: T[]) {
    this.currentFocusedItems = i;
    this.focusedItemsSource.next(i);
  }

  ngOnDestroy(): void {
    this.focusedItemsSource.complete();
    this.itemsSource.complete();
    this.loadingSource.complete();
  }

  public reloadItems(): void {
    this.focusedItems = [];
    this.loadingSource.next(true);
    this.dataService.readAll().pipe(
      delay(0),
      tap(items => this.itemsSource.next(items)),
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


}
