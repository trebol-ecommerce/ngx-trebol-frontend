// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { SellType } from 'src/app/models/entities/SellType';
import { ISharedDataApiService } from '../../shared.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { MOCK_USER_ROLES } from './sources/mock-user-roles.datasource';
import { MOCK_SELL_TYPES } from './sources/mock-sell-types.datasource';
import { MOCK_PRODUCT_CATEGORIES } from './sources/mock-product-categories.datasource';
import { MOCK_PEOPLE } from './sources/mock-people.datasource';

@Injectable()
export class SharedDataLocalMemoryApiService
  implements ISharedDataApiService {

  public readAllPeople(): Observable<Person[]> {
    return of(MOCK_PEOPLE.map(f => Object.assign(new Person(), f)));
  }

  public readAllProductCategories(): Observable<ProductCategory[]> {
    return of(MOCK_PRODUCT_CATEGORIES);
  }

  public readAllProductCategoriesByParentCode(parentCode: string): Observable<ProductCategory[]> {
    return of(MOCK_PRODUCT_CATEGORIES.filter(t => t.parent.id === parentCode));
  }

  public readAllSellTypes(): Observable<SellType[]> {
    return of(MOCK_SELL_TYPES);
  }

  public readAllUserRoles(): Observable<UserRole[]> {
    return of(MOCK_USER_ROLES);
  }
}
