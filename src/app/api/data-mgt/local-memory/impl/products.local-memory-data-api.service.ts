// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { ProductFilters } from 'src/app/shared/product-filters-panel/product-filters-panel.component';
import { Product } from 'src/app/models/entities/Product';
import { EntityLocalMemoryDataApiService } from '../entity.local-memory-data-api.aservice';
import { Observable, of } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { MOCK_PRODUCT_FAMILIES, MOCK_PRODUCT_TYPES } from './shared.local-memory-data-api.service';

export const MOCK_PRODUCTS: Partial<Product>[] = [
  {
    id: 1,
    name: 'Zapatillas Nike Air Jordan Azul/Negro',
    barcode: 'NIKE-AZLNGR-1',
    price: 14990,
    currentStock: 40,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1578116922645-3976907a7671.jpg' ]
  },
  {
    id: 2,
    name: 'Zapatillas Nike Hi-Top Rojo/Negro',
    barcode: 'NIKE-ROJNGR-1',
    price: 14990,
    currentStock: 20,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1578172433613-9f1b258f7d5b.jpg' ]
  },
  {
    id: 3,
    name: 'Zapatillas Nike Hi-Top Rojo/Blanco',
    barcode: 'NIKE-ROJBCO-1',
    price: 13990,
    currentStock: 60,
    criticalStock: 5,
    productType: {
      id: 1,
      description: 'Zapatillas Hombre',
      productFamily: { id: 1 }
    },
    imagesURL: [ 'assets/img/products/photo-1580143881495-b21dde95fc60.jpg' ]
  }
];

@Injectable()
export class ProductsLocalMemoryDataApiService
  extends EntityLocalMemoryDataApiService<Product> {

  protected items: Product[] = MOCK_PRODUCTS.map(n => Object.assign(new Product(), n));

  constructor() {
    super();
  }

  public readProductTypes(): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.map(t => Object.assign(new ProductType(), t)));
  }

  public readProductTypesByFamilyId(productFamilyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === productFamilyId)
      .map(t => Object.assign(new ProductType(), t))
    );
  }

  public readProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES.map(f => Object.assign(new ProductFamily(), f)));
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
