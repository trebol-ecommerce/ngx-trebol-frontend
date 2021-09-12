// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/entities/Customer';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_CUSTOMERS } from './sources/mock-customers.datasource';

@Injectable()
export class CustomersDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Customer> {

  protected items: Customer[] = MOCK_CUSTOMERS.map(n => Object.assign(new Customer(), n));

  constructor() {
    super();
  }
}
