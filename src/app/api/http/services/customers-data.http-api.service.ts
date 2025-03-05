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
import { makeFetchHttpParams } from '../http-api.functions';
import { environment } from 'src/environments/environment';
import { ITransactionalEntityDataApiService } from '../../transactional-entity.data-api.iservice';
import { ApiDataPageQuerySpec } from 'src/models/ApiDataPageQuerySpec';

@Injectable()
export class CustomersDataHttpApiService
  implements ITransactionalEntityDataApiService<Person> {

  private readonly baseUrl = `${environment.apiUrls.data}/customers`

  constructor(private http: HttpClient) { }

  create(item: Person) {
    return this.http.post<void>(
      this.baseUrl,
      item
    );
  }

  fetchPage(p: ApiDataPageQuerySpec) {
    const params = makeFetchHttpParams(p);

    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      { params }
    );
  }

  fetchExisting(customer: Person) {
    return this.http.get<DataPage<Person>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.idNumber)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(customer: Person) {
    return this.http.put<void>(
      this.baseUrl,
      customer,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.idNumber)
        } })
      }
    );
  }

  delete(customer: Person) {
    return this.http.delete<void>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.idNumber)
        } })
      }
    );
  }
}
