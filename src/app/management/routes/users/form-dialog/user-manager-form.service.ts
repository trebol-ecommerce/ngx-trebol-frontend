import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagerFormService } from 'src/app/management/data-manager-form.aservice';
import { Person } from 'src/data/models/entities/Person';
import { User } from 'src/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

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
