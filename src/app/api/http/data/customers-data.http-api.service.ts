/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataPage } from 'src/models/DataPage';
import { Customer } from 'src/models/entities/Customer';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class CustomersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Customer> {

  constructor(http: HttpClient) {
    super(http, '/customers');
  }

  fetchExisting(customer: Customer) {
    return this.http.get<DataPage<Customer>>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.person.idNumber)
        } })
      }
    ).pipe(
      map(page => page.items[0])
    );
  }

  update(customer: Customer) {
    return this.http.put(
      this.baseUrl,
      customer,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.person.idNumber)
        } })
      }
    );
  }

  delete(customer: Customer) {
    return this.http.delete(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.person.idNumber)
        } })
      }
    );
  }
}
