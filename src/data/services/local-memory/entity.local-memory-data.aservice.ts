import { EntityDataIService } from '../entity.data.iservice';
import { AbstractEntity } from 'src/data/models/AbstractEntity';
import { Observable, of } from 'rxjs';

/**
 * Extend this class and give it an array of T-class objects to get a fully-working local CRUD service.
 */
export abstract class EntityLocalMemoryDataService<T extends AbstractEntity>
  implements EntityDataIService<AbstractEntity> {

  protected abstract items: T[];

  /**
   * TODO: Document this method
   */
  protected filterItems(filter: any): Set<T> {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName) && propName !== 'id') {
        const propValue = filter[propName];
        if (typeof propValue === 'string') {
          matchingItems = matchingItems.filter(
            it => (propName in it) && (it[propName] as string).toUpperCase().includes(propValue.toUpperCase()) );
        } else if (typeof propValue === 'number') {
          matchingItems = matchingItems.filter(it => propName in it && it[propName] === propValue);
        } else if (typeof propValue === 'object') {
          if (propValue instanceof Date) {
            matchingItems = matchingItems.filter(it => propName in it && it[propName].toString() === propValue.toString());
          } else if ('id' in propValue) {
            matchingItems = matchingItems.filter(it => propName in it && (it[propName] as AbstractEntity).id === propValue.id);
          }
        }
      }
    }

    const uniqueItems = new Set<T>();
    for (const item of matchingItems) {
      uniqueItems.add(item);
    }
    return uniqueItems;
  }

  /**
   * TODO: Document this method
   */
  public create(d: T): Observable<T> {
    return new Observable(
      observer => {
        if (!d.id) {
          const devicesById = this.items.sort((a, b) => ((a.id as number) - (b.id as number)));
          const highestId = devicesById[this.items.length - 1].id as number;
          d.id = highestId + 1;
          this.items.push(d);
          observer.next(d);
        } else {
          observer.error(d);
        }
        observer.complete();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  /**
   * TODO: Document this method
   */
  public readById(id: number): Observable<T> {
    return of(this.items.find(d => d.id === id));
  }

  /**
   * TODO: Document this method
   */
  public readAll(): Observable<T[]> {
    return of(this.items);
  }

  /**
   * TODO: Document this method
   */
  public readFiltered(filter: any): Observable<T[]> {
    return new Observable(
      observer => {
        observer.next([...this.filterItems(filter)]);
        observer.complete();
        return {
          unsubscribe() {}
        };
      }
    );
  }

  /**
   * TODO: Document this method
   */
  public update(d: T, id: number): Observable<T> {
    return new Observable(
      observer => {
        if (!!id) {
          const indexInDb = this.items.findIndex(dv => dv.id === id);
          if (indexInDb !== -1) {
            d.id = id;
            this.items[indexInDb] = d;
            observer.next(d);
            observer.complete();
          }
        }
        observer.error();

        return {
          unsubscribe() { }
        };
      }
    );
  }

  /**
   * TODO: Document this method
   */
  public deleteById(id: number): Observable<boolean> {
    return new Observable(
      observer => {
        if (!!id) {
          const indexInDb = this.items.findIndex(dv => dv.id === id);
          const exists = (indexInDb !== -1);
          if (exists) {
            this.items.splice(indexInDb, 1);
            observer.next(true);
          }
          observer.complete();
        }
        observer.error();

        return {
          unsubscribe() { }
        };
      }
    );
  }
}
