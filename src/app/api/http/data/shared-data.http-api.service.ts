// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { BillingType } from 'src/app/models/entities/BillingType';
import { IUserRolesDataApiService } from '../../user-roles.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { HttpApiService } from '../http-api.abstract.service';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/app/models/DataPage';
import { IPeopleDataApiService } from '../../people.data-api.iservice';
import { IBillingTypesDataApiService } from '../../billing-types.data-api.iservice';
import { IProductCategoriesDataApiService } from '../../product-categories.data-api.iservice';

@Injectable()
export class SharedDataHttpApiService
  extends HttpApiService
  implements IProductCategoriesDataApiService, IPeopleDataApiService, IBillingTypesDataApiService, IUserRolesDataApiService {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient) {
    super(http);
  }

  readAllPeople() {
    return this.http.get<Person[]>(
      `${this.baseUrl}/people`
    );
  }

  readAllBillingTypes() {
    return this.http.get<BillingType[]>(
      `${this.baseUrl}/billing_types`
    );
  }

  readAllProductCategories() {
    return this.http.get<DataPage<ProductCategory>>(
      `${this.baseUrl}/product_categories`
    ).pipe(
      map(page => page.items),
      retry(2)
    );
  }

  readAllProductCategoriesByParentCode(parentCode: string) {
    return this.http.get<DataPage<ProductCategory>>(
      `${this.baseUrl}/product_categories`,
      {
        params: new HttpParams({ fromObject: {
          familyId: String(parentCode)
        } })
      }
    ).pipe(
      map(page => page.items),
      retry(2)
    );
  }

  readAllUserRoles() {
    return this.http.get<UserRole[]>(
      `${this.baseUrl}/user_roles`
    ).pipe(
      retry(2)
    );
  }
}
