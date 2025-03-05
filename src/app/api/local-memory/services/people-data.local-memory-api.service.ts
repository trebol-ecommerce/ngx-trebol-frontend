/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Injectable } from '@angular/core';
import { Person } from 'src/models/entities/Person';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_PEOPLE } from '../mock-data/mock-people.datasource';

@Injectable()
export class PeopleDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Person> {

  protected items = MOCK_PEOPLE.slice();

  constructor() {
    super();
  }

  protected itemExists(person: Partial<Person>) {
    return this.items.some(person2 => (person.idNumber === person2.idNumber));
  }

  protected getIndexOfItem(person: Partial<Person>) {
    return this.items.findIndex(person2 => (person.idNumber === person2.idNumber));
  }
}
