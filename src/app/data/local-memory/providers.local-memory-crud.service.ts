import { Injectable } from '@angular/core';
import { Provider } from 'src/app/data/models/entities/Provider';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_EMPLOYEES: Partial<Provider>[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'test',
      email: 'somebody@oncetold.me'
    }
  }
];

@Injectable()
export class ProvidersLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<Provider> {

  protected items: Provider[] = MOCK_EMPLOYEES.map(n => Object.assign(new Provider(), n));

  constructor() {
    super();
  }
}
