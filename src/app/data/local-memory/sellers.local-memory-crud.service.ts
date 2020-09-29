import { Injectable } from '@angular/core';
import { Seller } from 'src/app/data/models/entities/Seller';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_EMPLOYEES: Partial<Seller>[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Anónimo',
      idCard: '1111111-1',
      address: 'Ejemplo 275',
      email: 'example@domain.com'
    }
  }
];

@Injectable()
export class SellersLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<Seller> {

  protected items: Seller[] = MOCK_EMPLOYEES.map(n => Object.assign(new Seller(), n));

  constructor() {
    super();
  }
}
