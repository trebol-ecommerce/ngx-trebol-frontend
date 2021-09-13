// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/app/models/DataPage';
import { Product } from 'src/app/models/entities/Product';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { API_SERVICE_INJECTION_TOKENS } from '../../api-service-injection-tokens';
import { IProductsPublicApiService } from '../../products-public-api.iservice';
import { TransactionalEntityDataLocalMemoryApiService } from '../transactional-entity-data.local-memory-api.abstract.service';

@Injectable()
export class ProductsPublicLocalMemoryApiService
  implements IProductsPublicApiService {

  protected items: Product[] = [];

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) private dataService: TransactionalEntityDataLocalMemoryApiService<Product>
  ) {
    this.dataService.fetchPage().subscribe(response => {
      this.items = response.items;
    });
  }

  fetchProductByBarcode(barcode: string): Observable<Product> {
    return new Observable(
      observer => {
        const index = this.items.findIndex(d => d.barcode === barcode);
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

  fetchStoreFrontProductCollection(): Observable<DataPage<Product>> {
    return of(this.items).pipe(
      map(items => ({
        totalCount: items.length,
        items,
        pageSize: items.length,
        pageIndex: 0
      }))
    );
  }

  fetchFilteredProductCollection(filter: ProductFilters): Observable<DataPage<Product>> {
    return new Observable(
      observer => {
        const matchingItems = this.filterItems(filter);
        observer.next({
          totalCount: matchingItems.length,
          items: matchingItems,
          pageSize: matchingItems.length,
          pageIndex: 0
        });
        observer.complete();

        return {
          unsubscribe() {}
        };
      }
    );
  }

  private filterItems(filter: ProductFilters): Product[] {
    let matchingItems = this.items;
    if (filter.name) {
      matchingItems = matchingItems.filter(
        it => it.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.categoryCode) {
      matchingItems = matchingItems.filter(
        it => it.category.code === filter.categoryCode
      );
    }

    return matchingItems;
  }
}
