// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { EntityDataLocalMemoryApiService } from '../entity-data.local-memory-api.abstract.service';
import { MOCK_PEOPLE } from '../mock/mock-people.datasource';
import { Person } from 'src/app/models/entities/Person';

@Injectable()
export class PeopleDataLocalMemoryApiService
  extends EntityDataLocalMemoryApiService<Person> {

  protected items = MOCK_PEOPLE.map(n => Object.assign(new Person(), n));

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
