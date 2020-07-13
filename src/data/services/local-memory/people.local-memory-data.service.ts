import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Injectable } from '@angular/core';
import { Person } from 'src/data/models/entities/Person';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const MOCK_PEOPLE: Partial<Person>[] = [
  { id: 1, name: 'Anónimo' }
];

@Injectable()
export class PeopleLocalMemoryDataService
  extends EntityLocalMemoryDataService<Person> {

  protected items: Person[] = MOCK_PEOPLE.map(n => Object.assign(new Person(), n));

  constructor() {
    super();
  }

  public create(persona: Person): Observable<Person> {
    return super.create(persona).pipe(
      map(p => Object.assign(new Person(), p))
    );
  }
}
