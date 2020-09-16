import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityDataIService } from 'src/app/data/entity.data.iservice';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormService<User> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.users) public dataService: EntityDataIService<User>,
    @Inject(DATA_INJECTION_TOKENS.people) protected peopleDataService: EntityDataIService<Person>
  ) {
    super();
  }

  public getPeople(): Observable<Person[]> {
    return this.peopleDataService.readAll();
  }
}
