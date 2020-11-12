// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { SellType } from 'src/app/models/entities/SellType';
import { SharedDataApiIService } from '../shared-data-api.iservice';
import { Person } from 'src/app/models/entities/Person';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { id: 1, name: 'Anónimo' },
  { id: 2, name: 'Administrador', idCard: '' }
];

export const MOCK_PRODUCT_FAMILIES: Partial<ProductFamily>[] = [
  { id: 1, name: 'Ropa y Calzado' }
];

export const MOCK_PRODUCT_TYPES: Partial<ProductType>[] = [
  { id: 1, name: 'Zapatillas Hombre', productFamily: { id: 1 } }
];

export const MOCK_SELL_TYPES: SellType[] = [
  { id: 'B', description: 'Boleta' },
  { id: 'F', description: 'Factura' }
];

@Injectable()
export class SharedLocalMemoryDataService
  implements SharedDataApiIService {

  public readAllPeople(): Observable<Person[]> {
    return of(MOCK_PEOPLE.map(f => Object.assign(new Person(), f)));
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES.map(f => Object.assign(new ProductFamily(), f)));
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.map(t => Object.assign(new ProductType(), t)));
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === familyId)
      .map(t => Object.assign(new ProductType(), t))
    );
  }

  public readAllSellTypes(): Observable<SellType[]> {
    return of(MOCK_SELL_TYPES.map(t => Object.assign(new SellType(), t)));
  }
}
