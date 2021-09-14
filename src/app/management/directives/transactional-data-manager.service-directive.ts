// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Directive } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo, mergeMap, tap, toArray } from 'rxjs/operators';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { DataManagerServiceDirective } from './data-manager.service-directive';

@Directive()
export abstract class TransactionalDataManagerServiceDirective<T>
  extends DataManagerServiceDirective<T> {

  abstract dataService: ITransactionalEntityDataApiService<T>;

  constructor() {
    super();
  }

  /** Delete items contained in the array one by one */
  removeItems(items: T[]): Observable<boolean[]> {
    this.focusedItems = items;
    return from(items).pipe(
      mergeMap<T, Observable<boolean>>(item => this.dataService.delete(item).pipe(mapTo(true), catchError(() => of(false)))),
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
