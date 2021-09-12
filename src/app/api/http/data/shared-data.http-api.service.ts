// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ProductFamily } from 'src/app/models/entities/ProductFamily';
import { ProductType } from 'src/app/models/entities/ProductType';
import { SellType } from 'src/app/models/entities/SellType';
import { ISharedDataApiService } from '../../shared.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { HttpApiService } from '../http-api.abstract.service';
import { environment } from 'src/environments/environment';

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

  readAllProductFamilies() {
    return this.http.get<ProductFamily[]>(
      `${this.baseUrl}/product_families`
    ).pipe(
      retry(2)
    );
  }

  readAllProductTypes() {
    return this.http.get<ProductType[]>(
      `${this.baseUrl}/product_types`
    ).pipe(
      retry(2)
    );
  }

  readAllProductTypesByFamilyId(familyId: number) {
    return this.http.get<ProductType[]>(
      `${this.baseUrl}/product_types`,
      {
        params: new HttpParams({ fromObject: {
          familyId: String(familyId)
        } })
      }
    ).pipe(
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
