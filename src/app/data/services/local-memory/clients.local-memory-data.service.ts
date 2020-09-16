import { Injectable } from '@angular/core';
import { Client } from 'src/app/data/models/entities/Client';
import { EntityLocalMemoryDataService } from './entity.local-memory-data.aservice';

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
export class ClientsLocalMemoryDataService
  extends EntityLocalMemoryDataService<Client> {

  protected items: Client[] = MOCK_CLIENTS.map(n => Object.assign(new Client(), n));

  constructor() {
    super();
  }
}
