import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Client } from 'src/data/models/entities/Client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public create(cliente: Client): Observable<Client> {
    return super.create(cliente).pipe(
      map(u => Object.assign(new Client(), u))
    );
  }
}
