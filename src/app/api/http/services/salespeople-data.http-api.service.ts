/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Person } from 'src/models/entities/Person';
import { environment } from 'src/environments/environment';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { makeFetchHttpParams } from '../http-api.functions';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class SalespeopleDataHttpApiService
  implements ITransactionalEntityDataApiService<Person> {

  private readonly baseUrl = `${environment.apiUrls.data}/salespeople`;

  constructor(private http: HttpClient) { }

  create(product: Person) {
    return this.http.post<void>(
      this.baseUrl,
      product
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);
    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(salesperson: Partial<Person>) {
    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(salesperson: Partial<Person>) {
    return this.http.put<void>(
      this.baseUrl,
      salesperson,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    );
  }

  delete(salesperson: Partial<Person>) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(salesperson.idNumber)
        } })
      }
    );
  }
}
