import { Injectable } from '@angular/core';
import { Person } from 'src/app/data/models/entities/Person';
import { EntityLocalMemoryCrudService } from './entity.local-memory-crud.aservice';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { id: 1, name: 'Anónimo' },
  { id: 2, name: 'Administrador', idCard: '' }
];

@Injectable()
export class PeopleLocalMemoryCrudService
  extends EntityLocalMemoryCrudService<Person> {

  protected items: Person[] = MOCK_PEOPLE.map(n => Object.assign(new Person(), n));

  constructor() {
    super();
  }
}
