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
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';
import { Person } from 'src/models/entities/Person';

@Injectable()
export class CustomersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Person> {

  constructor(http: HttpClient) {
    super(http, '/customers');
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
    return this.http.put(
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
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.idNumber)
        } })
      }
    );
  }
}
