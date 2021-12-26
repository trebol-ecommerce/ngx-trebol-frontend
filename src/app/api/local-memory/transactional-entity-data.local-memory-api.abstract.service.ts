/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Observable, of } from 'rxjs';
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
    const index = this.getIndexOfItem(itemLike);
    return of<T>(this.items[index]);
  }

  update(d: T, original?: T) {
    return new Observable<void>(
      observer => {
        const index = original ? this.getIndexOfItem(original) : this.getIndexOfItem(d);
        const existingItem = this.items[index];
        if (existingItem === null) {
          observer.error({ status: 404 });
        } else {
          Object.assign(this.items[index], d);
          observer.next();
          observer.complete();
        }

        return {
          unsubscribe() { }
        };
      }
    );
  }

  delete(item: Partial<T>) {
    return new Observable<void>(
      observer => {
        const index = this.getIndexOfItem(item);
        if (index === -1) {
          observer.error({ status: 404 });
        } else {
          this.items.splice(index, 1);
          observer.next();
          observer.complete();
        }

        return {
          unsubscribe() { }
        };
      }
    );
  }
}
