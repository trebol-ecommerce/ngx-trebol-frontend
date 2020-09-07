import { Injectable } from '@angular/core';
import { Person } from 'src/data/models/entities/Person';
import { EntityLocalMemoryDataService } from './entity.local-memory-data.aservice';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { id: 1, name: 'Anónimo' },
  { id: 2, name: 'Administrador', idCard: '' }
];

@Injectable()
export class PeopleLocalMemoryDataService
  extends EntityLocalMemoryDataService<Person> {

  protected items: Person[] = MOCK_PEOPLE.map(n => Object.assign(new Person(), n));

  constructor() {
    super();
  }
}
