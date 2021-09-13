// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IUserRolesDataApiService } from '../../user-roles.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { MOCK_USER_ROLES } from '../mock/mock-user-roles.datasource';
import { MOCK_SELL_TYPES } from '../mock/mock-sell-types.datasource';
import { MOCK_PRODUCT_CATEGORIES } from '../mock/mock-product-categories.datasource';
import { MOCK_PEOPLE } from '../mock/mock-people.datasource';
import { IPeopleDataApiService } from '../../people.data-api.iservice';
import { IProductCategoriesDataApiService } from '../../product-categories.data-api.iservice';
import { IBillingTypesDataApiService } from '../../billing-types.data-api.iservice';

@Injectable()
export class SharedDataLocalMemoryApiService
  implements IPeopleDataApiService, IProductCategoriesDataApiService, IBillingTypesDataApiService, IUserRolesDataApiService {

  readAllPeople() {
    return of(MOCK_PEOPLE.map(f => Object.assign(new Person(), f)));
  }

  readAllProductCategories() {
    return of(MOCK_PRODUCT_CATEGORIES);
  }

  readAllProductCategoriesByParentCode(parentCode: string) {
    return of(MOCK_PRODUCT_CATEGORIES.filter(t => t.parent.code === parentCode));
  }

  readAllBillingTypes() {
    return of(MOCK_SELL_TYPES);
  }

  readAllUserRoles() {
    return of(MOCK_USER_ROLES);
  }
}
