// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@angular/core';
import { Client } from 'src/app/data/models/entities/Client';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_CLIENTS: Partial<Client>[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Calle Sin Salida 47',
      email: 'example@test.org'
    }
  }
];

@Injectable()
export class ClientsLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<Client> {

  protected items: Client[] = MOCK_CLIENTS.map(n => Object.assign(new Client(), n));

  constructor() {
    super();
  }
}
