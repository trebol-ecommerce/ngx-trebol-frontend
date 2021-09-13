// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { ProductCategory } from 'src/app/models/entities/ProductCategory';
import { SellType } from 'src/app/models/entities/SellType';
import { ISharedDataApiService } from '../../shared.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { HttpApiService } from '../http-api.abstract.service';
import { environment } from 'src/environments/environment';
import { DataPage } from 'src/app/models/DataPage';

@Injectable()
export class SharedDataHttpApiService
  extends HttpApiService
  implements ISharedDataApiService {

  baseUrl = environment.apiUrls.data;

  constructor(http: HttpClient) {
    super(http);
  }

  readAllPeople() {
    return this.http.get<Person[]>(
      `${this.baseUrl}/people`
    );
  }

  readAllSellTypes() {
    return this.http.get<SellType[]>(
      `${this.baseUrl}/sell_types`
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
