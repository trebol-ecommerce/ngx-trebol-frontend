/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { mapTo, switchMap, tap, toArray } from 'rxjs/operators';
import { paginateItems } from 'src/functions/paginateItems';
import { DataPage } from 'src/models/DataPage';
import { Product } from 'src/models/entities/Product';
import { ProductList } from 'src/models/entities/ProductList';
import { API_SERVICE_INJECTION_TOKENS } from '../../api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { IProductListContentsDataApiService } from '../../transactional-product-lists.data.api.iservice';
import {
  matchesDateProperty, matchesIdProperty, matchesNumberProperty, matchesStringProperty
} from '../entity-data.local-memory-api.functions';
import { MOCK_PRODUCT_LISTS, MOCK_PRODUCT_LIST_CONTENTS_MAP } from '../mock/mock-product-lists.datasource';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductListsDataLocalMemoryApiService
  extends TransactionalEntityDataLocalMemoryApiService<ProductList>
  implements IProductListContentsDataApiService {

  protected items = MOCK_PRODUCT_LISTS.slice();
  protected itemContentsMap = new Map([...MOCK_PRODUCT_LIST_CONTENTS_MAP.entries()]);

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private productsApiService: ITransactionalEntityDataApiService<Product>
  ) {
    super();
  }

  create(item: ProductList) {
    return new Observable<void>(
      observer => {
        if (this.itemExists(item)) {
          observer.error({ status: 400 });
        }
        this.items.push(item);
        this.itemContentsMap.set(item.code, new Set());
        observer.next();
        observer.complete();
        return {
          unsubscribe() { }
        };
      }
    );
  }

  update(d: ProductList, original?: ProductList) {
    return of(!!original ?
      this.getIndexOfItem(original) :
      this.getIndexOfItem(d)
    ).pipe(
      switchMap(index => (index === -1) ?
        throwError({ status: 404 }) :
        of(void 0).pipe(tap(() => {
          const code = this.items[index].code;
          const contentSet = this.itemContentsMap.get(code);
          Object.assign(this.items[index], d);
          this.itemContentsMap.delete(code);
          this.itemContentsMap.set(this.items[index].code, contentSet);
        }))
      )
    );
  }

  fetchContents(list: ProductList, pageIndex?: number, pageSize?: number, sortBy?: string, order?: string): Observable<DataPage<Product>> {
    if (!this.itemContentsMap.has(list.code)) {
      return throwError({ status: 404 });
    } else {
      const fullListContents = [...this.itemContentsMap.get(list.code).values()];
      const totalCount = fullListContents.length;
      const items = paginateItems(fullListContents, pageIndex, pageSize);
      return of<DataPage<Product>>({
        items,
        totalCount,
        pageIndex,
        pageSize
      });
    }
  }

  addToContents(list: ProductList, productLike: Partial<Product>): Observable<any> {
    if (!this.itemContentsMap.has(list.code)) {
      return throwError({ status: 404 });
    } else {
      const fullListContents = this.itemContentsMap.get(list.code);
      return this.productsApiService.fetchExisting(productLike).pipe(
        tap(p => {
          fullListContents.add(p);
          list.totalCount = fullListContents.size;
        }),
        mapTo(void 0)
      );
    }
  }

  deleteFromContents(list: ProductList, productLike?: Partial<Product>): Observable<any> {
    if (!this.itemContentsMap.has(list.code)) {
      return throwError({ status: 404 });
    } else {
      const fullListContents = [...this.itemContentsMap.get(list.code)];
      const listItemIndex = fullListContents.findIndex(p => (p.barcode === productLike.barcode));
      fullListContents.splice(listItemIndex, 1);
      this.itemContentsMap.set(list.code, new Set(fullListContents));
      list.totalCount = fullListContents.length;
      return of(void 0);
    }
  }

  updateContents(list: ProductList, products: Partial<Product>[]): Observable<any> {
    if (!this.itemContentsMap.has(list.code)) {
      return throwError({ status: 404 });
    } else {
      return from(products).pipe(
        switchMap(p => this.productsApiService.fetchExisting(p)),
        toArray(),
        tap(products => {
          this.itemContentsMap.set(list.code, new Set(products));
          list.totalCount = products.length;
        }),
        mapTo(void 0)
      );
    }
  }

  protected itemExists(category: Partial<ProductList>): boolean {
    return this.items.some(category2 => (category.code === category2.code));
  }

  protected getIndexOfItem(category: Partial<ProductList>): number {
    return this.items.findIndex(category2 => (category.code === category2.code));
  }

  protected filterItems(filter: any): ProductList[] {
    let matchingItems = this.items;
    for (const propName in filter) {
      if (filter.hasOwnProperty(propName)) {
        const propValue = filter[propName];
        if (propName === 'nameLike') {
          const nameRegexp = new RegExp(`^.+${propValue}.+$`);
          matchingItems = matchingItems.filter(c => nameRegexp.test(c.name));
        } else if (propName !== 'id') {
          if (typeof propValue === 'string') {
            matchingItems = matchingItems.filter(it => matchesStringProperty(it, propName, propValue));
          } else if (typeof propValue === 'number') {
            matchingItems = matchingItems.filter(it => matchesNumberProperty(it, propName, propValue));
          } else if (propValue === null) {
            matchingItems = matchingItems.filter(it => (it[propName] === null));
          } else if (typeof propValue === 'object') {
            if (propValue instanceof Date) {
              matchingItems = matchingItems.filter(it => matchesDateProperty(it, propName, propValue));
            } else if ('id' in propValue) {
              matchingItems = matchingItems.filter(it => matchesIdProperty(it, propName, propValue));
            }
          }
        }
      }
    }

    return matchingItems;
  }
}
