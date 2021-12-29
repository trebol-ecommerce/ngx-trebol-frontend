/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ITransactionalEntityDataApiService } from '../transactional-entity.data-api.iservice';
import { EntityDataLocalMemoryApiService } from './entity-data.local-memory-api.abstract.service';

/**
 * Base class for a fully-working CRUD service in the local (client) memory.
 */
export abstract class TransactionalEntityDataLocalMemoryApiService<T>
  extends EntityDataLocalMemoryApiService<T>
  implements ITransactionalEntityDataApiService<T> {

  protected abstract items: T[];
  protected abstract itemExists(itemLike: Partial<T>): boolean;
  protected abstract getIndexOfItem(itemLike: Partial<T>): number;

  create(item: T) {
    return new Observable<void>(
      observer => {
        if (this.itemExists(item)) {
          observer.error({ status: 400 });
        }
        this.items.push(item);
        observer.next();
        observer.complete();
        return {
          unsubscribe() { }
        };
      }
    );
  }


  fetchExisting(itemLike: Partial<T>) {
    return of(this.getIndexOfItem(itemLike)).pipe(
      switchMap(index => (index === -1) ?
        throwError({ status: 404 }) :
        of(this.items[index])
      )
    );
  }

  update(d: T, original?: T) {
    return of(!!original ?
      this.getIndexOfItem(original) :
      this.getIndexOfItem(d)
    ).pipe(
      switchMap(index => (index === -1) ?
        throwError({ status: 404 }) :
        of(void 0).pipe(tap(() => Object.assign(this.items[index], d)))
      )
    );
  }

  delete(item: Partial<T>) {
    return of(this.getIndexOfItem(item)).pipe(
      switchMap(index => (index === -1) ?
        throwError({ status: 404 }) :
        of(void 0).pipe(tap(() => this.items.splice(index, 1)))
      )
    );
  }
}
