/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/entities/Customer';
import { IEntityDataApiService } from '../../entity.data-api.iservice';
import { TransactionalEntityDataHttpApiService } from '../transactional-entity-data.http-api.abstract.service';

@Injectable()
export class CustomersDataHttpApiService
  extends TransactionalEntityDataHttpApiService<Customer>
  implements IEntityDataApiService<Customer> {

  constructor(http: HttpClient) {
    super(http, '/customers');
  }

  fetchExisting(customer: Customer) {
    return this.http.get<Customer>(
      this.baseUrl,
      {
        params: new HttpParams({ fromObject: {
          idNumber: String(customer.person.idNumber)
        } })
      }
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
