import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';

@Directive()
export abstract class DataManagerFormService<T extends AbstractEntity>
  implements OnDestroy {

  protected abstract dataService: EntityCrudIService<T>;

  protected savingSource: Subject<boolean> = new BehaviorSubject(false);
  public saving$: Observable<boolean> = this.savingSource.asObservable();


  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  public submit(item: T): Observable<boolean> {
    this.savingSource.next(true);
    const doSubmit = ((item.id) ? this.dataService.update(item, item.id) : this.dataService.create(item));
    return doSubmit.pipe(
      catchError(() => of(null)),
      tap(() => { this.savingSource.next(false); }),
      map(next => !!(next))
    );
  }
}
