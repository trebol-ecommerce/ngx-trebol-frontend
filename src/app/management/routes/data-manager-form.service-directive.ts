// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { AbstractEntity } from 'src/app/models/AbstractEntity';

/**
 * Base class for data form component services.
 */
@Directive()
export abstract class DataManagerFormServiceDirective<T>
  implements OnDestroy {

  protected abstract dataService: IEntityDataApiService<T>;

  protected savingSource: Subject<boolean> = new BehaviorSubject(false);
  public saving$: Observable<boolean> = this.savingSource.asObservable();
  isNewItem: boolean;

  ngOnDestroy(): void {
    this.savingSource.complete();
  }

  public submit(item: T): Observable<boolean> {
    this.savingSource.next(true);
    const doSubmit = ((this.isNewItem) ? this.dataService.create(item) : this .dataService.update(item));
    return doSubmit.pipe(
      catchError(() => of(null)),
      tap(() => { this.savingSource.next(false); }),
      map(next => !!(next))
    );
  }
}
