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
import { EntityDataHttpApiService } from '../entity-data.http-api.abstract.service';
import { UserRole } from 'src/app/models/entities/UserRole';

@Injectable()
export class SharedDataHttpApiService
  extends EntityDataHttpApiService
  implements ISharedDataApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  public readAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${this.baseUrl}/people`
    );
  }

  readAllSellTypes(): Observable<SellType[]> {
    return this.http.get<SellType[]>(
      `${this.baseUrl}/sell_types`
    );
  }

  public readAllProductFamilies(): Observable<ProductFamily[]> {
    return this.http.get<ProductFamily[]>(
      `${this.baseUrl}/product_families`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(
      `${this.baseUrl}/product_types`
    ).pipe(
      retry(2)
    );
  }

  public readAllProductTypesByFamilyId(familyId: number): Observable<ProductType[]> {
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

  public readAllUserRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(
      `${this.baseUrl}/user_roles`
    ).pipe(
      retry(2)
    );
  }
}
