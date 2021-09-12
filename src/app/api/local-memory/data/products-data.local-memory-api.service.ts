// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { ProductFilters } from 'src/app/shared/components/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/app/models/entities/Product';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { Observable, of } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { MOCK_PRODUCTS } from './sources/mock-products.datasource';
import { MOCK_PRODUCT_TYPES } from './sources/mock-product-types.datasource';
import { MOCK_PRODUCT_FAMILIES } from './sources/mock-product-families.datasource';

@Injectable()
export class ProductsDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Product> {

  protected items: Product[] = MOCK_PRODUCTS.map(n => Object.assign(new Product(), n));

  constructor() {
    super();
  }

  public readProductTypes(): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES);
  }

  public readProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === productFamilyId));
  }

  public readProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES);
  }

  protected filterItems(filter: ProductFilters): Product[] {
    let matchingItems = this.items;
    if (filter.name) {
      matchingItems = matchingItems.filter(
        it => it.name.toUpperCase().includes(filter.name.toUpperCase())
      );
    }
    if (filter.familyId) {
      matchingItems = matchingItems.filter(
        it => it.productType.productFamily.id === filter.familyId
      );
    }
    if (filter.typeId) {
      matchingItems = matchingItems.filter(
        it => it.productType.id === filter.typeId
      );
    }

    return matchingItems;
  }
}
