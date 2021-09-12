// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { SellType } from 'src/app/models/entities/SellType';
import { ISharedDataApiService } from '../../shared.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { MOCK_USER_ROLES } from './sources/mock-user-roles.datasource';
import { MOCK_SELL_TYPES } from './sources/mock-sell-types.datasource';
import { MOCK_PRODUCT_TYPES } from './sources/mock-product-types.datasource';
import { MOCK_PRODUCT_FAMILIES } from './sources/mock-product-families.datasource';
import { MOCK_PEOPLE } from './sources/mock-people.datasource';

@Injectable()
export class SharedDataLocalMemoryApiService
  implements ISharedDataApiService {

  public readAllPeople(): Observable<Person[]> {
    return of(MOCK_PEOPLE.map(f => Object.assign(new Person(), f)));
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return of(MOCK_PRODUCT_FAMILIES);
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES);
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
    return of(MOCK_PRODUCT_TYPES.filter(t => t.productFamily.id === familyId));
  }

  public readAllSellTypes(): Observable<SellType[]> {
    return of(MOCK_SELL_TYPES);
  }

  public readAllUserRoles(): Observable<UserRole[]> {
    return of(MOCK_USER_ROLES);
  }
}
