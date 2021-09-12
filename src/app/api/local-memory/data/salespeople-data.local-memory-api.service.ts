// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { EntityLocalMemoryDataApiService } from '../entity-data.local-memory-api.abstract.service';

export const MOCK_EMPLOYEES: Partial<Salesperson>[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Ejemplo 275',
      email: 'example@domain.com'
    }
  },
  {
    id: 2,
    person: {
      id: 2,
      name: 'Esteban Z.',
      idCard: '2296001-7',
      address: 'Carre Transistmica 9684',
      email: 'esteban@domain.com'
    }
  },
  {
    id: 3,
    person: {
      id: 3,
      name: 'Felipe N.',
      idCard: '3380154-6',
      address: 'Edison 2525',
      email: 'felipe@domain.com'
    }
  },
  {
    id: 4,
    person: {
      id: 4,
      name: 'Gloria S.',
      idCard: '4436747-1',
      address: 'Gutemberg 179',
      email: 'gloria@domain.com'
    }
  },
  {
    id: 5,
    person: {
      id: 5,
      name: 'Herminia J.',
      idCard: '5529827-2',
      address: 'Jose Puga 1735',
      email: 'herminia@domain.com'
    }
  }
];

@Injectable()
export class SalespeopleDataLocalMemoryApiService
  extends EntityLocalMemoryDataApiService<Salesperson> {

  protected items: Salesperson[] = MOCK_EMPLOYEES.map(n => Object.assign(new Salesperson(), n));

  constructor() {
    super();
  }
}
