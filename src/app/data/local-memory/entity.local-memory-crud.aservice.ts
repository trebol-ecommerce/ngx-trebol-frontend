// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { EntityCrudIService } from '../entity.crud.iservice';
import { AbstractEntity } from 'src/app/data/models/AbstractEntity';
import { Observable, of } from 'rxjs';

function matchesStringProperty(it: any, propName: string, propValue: string): boolean {
  return (propName in it) && (it[propName] as string).toUpperCase().includes(propValue.toUpperCase());
}

function matchesNumberProperty(it: any, propName: string, propValue: number): boolean {
  return (propName in it) && (it[propName] as number) === propValue;
}

function matchesDateProperty(it: any, propName: string, propValue: Date): boolean {
  return (propName in it) && (it[propName] as Date).toString() === propValue.toString();
}

function matchesAbstractEntityProperty(it: any, propName: string, propValue: AbstractEntity): boolean {
  return (propName in it) && (it[propName] as AbstractEntity).id === propValue.id;
}

/**
 * Base class for a fully-working CRUD service in the local (client) memory.
 */
export abstract class EntityLocalMemoryCrudService<T extends AbstractEntity>
  implements EntityCrudIService<T> {

  protected abstract items: T[];

  /**
   * From the entire item collection, for each property and value in the provided object, filters all items matching the value in the property.
   * It then returns a non-repeated
   */
  protected filterItems(filter: any): T[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName) && propName !== 'id') {
        const propValue = filter[propName];
        if (typeof propValue === 'string') {
          matchingItems = matchingItems.filter(it => matchesStringProperty(it, propName, propValue));
        } else if (typeof propValue === 'number') {
          matchingItems = matchingItems.filter(it => matchesNumberProperty(it, propName, propValue));
        } else if (typeof propValue === 'object') {
          if (propValue instanceof Date) {
            matchingItems = matchingItems.filter(it => matchesDateProperty(it, propName, propValue));
          } else if ('id' in propValue) {
            matchingItems = matchingItems.filter(it => matchesAbstractEntityProperty(it, propName, propValue));
          }
        }
      }
    }

    return matchingItems;
  }

  /**
   * Insert an item in the collection and generate its ID. Then emit the updated item.
   * Emit a 400 error if the item comes with an ID of its own.
   */
  public create(d: T): Observable<number> {
    return new Observable(
      observer => {
        if (d.id) {
          observer.error({ status: 400 });
        }

        const devicesById = this.items.sort((a, b) => ((a.id as number) - (b.id as number)));
        const highestId = devicesById[this.items.length - 1].id as number;
        d.id = highestId + 1;
        this.items.push(d);
        observer.next(d.id);
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  /**
   * Get the item of the collection that matches the given numeric ID. Then emit that item.
   * Emit a 404 error if none is found.
   */
  public readById(id: number): Observable<T> {
    return new Observable(
      observer => {
        const index = this.items.findIndex(d => d.id === id);
        if (index === -1) {
          observer.error({ status: 404 });
        }

        observer.next(this.items[index]);
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  /**
   * Get the entire collection and emit it.
   * //TODO paging would be nice
   */
  public readAll(): Observable<T[]> {
    return of(this.items);
  }

  /**
   * Filter the collection's items by matching their properties with those of the provided filter object. Then emit the resulting subset.
   * //TODO paging would be nice
   */
  public readFiltered(filter: any): Observable<T[]> {
    return new Observable(
      observer => {
        const matchingItems = this.filterItems(filter);
        observer.next(matchingItems);
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  /**
   * Replace the item matching the ID with a new item. Then emit the new item.
   * Emit a 400 error if the new item has no ID itself.
   * Emit a 404 error if no item matches the provided ID.
   */
  public update(d: T, id: number): Observable<number> {
    return new Observable(
      observer => {
        if (!!d.id) {
          observer.error({ status: 400 });
        }

        const indexInDb = this.items.findIndex(dv => dv.id === id);
        if (indexInDb === -1) {
          observer.error({ status: 404 });
        }

        this.items[indexInDb] = d;
        observer.next(d.id as number);
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  /**
   * Match and delete the item with the provided ID. Then emit.
   * Emit a 404 error if the match could not be made.
   */
  public deleteById(id: number): Observable<boolean> {
    return new Observable(
      observer => {
        const indexInDb = this.items.findIndex(dv => dv.id === id);
        if (indexInDb === -1) {
          observer.error({ status: 404 });
        }
        this.items.splice(indexInDb, 1);
        observer.next(true);
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }
}
