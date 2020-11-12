// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/entities/Person';
import { EntityLocalMemoryDataApiService } from './entity.local-memory-data-api.aservice';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { id: 1, name: 'Anónimo' },
  { id: 2, name: 'Administrador', idCard: '' }
];

@Injectable()
export class PeopleLocalMemoryDataApiService
  extends EntityLocalMemoryDataApiService<Person> {

  protected items: Person[] = MOCK_PEOPLE.map(n => Object.assign(new Person(), n));

  constructor() {
    super();
  }
}
