// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_SALESPEOPLE } from './sources/mock-salespeople.datasource';

@Injectable()
export class SalespeopleDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Salesperson> {

  protected items: Salesperson[] = MOCK_SALESPEOPLE.map(n => Object.assign(new Salesperson(), n));

  constructor() {
    super();
  }
}
