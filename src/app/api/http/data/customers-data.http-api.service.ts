// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HttpClient } from '@angular/common/http';
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
      `${this.baseUrl}/${customer.person.idCard}`
    );
  }

  update(customer: Customer) {
    return this.http.get(
      `${this.baseUrl}/${customer.person.idCard}`
    );
  }

  delete(customer: Customer) {
    return this.http.get(
      `${this.baseUrl}/${customer.person.idCard}`
    );
  }
}
