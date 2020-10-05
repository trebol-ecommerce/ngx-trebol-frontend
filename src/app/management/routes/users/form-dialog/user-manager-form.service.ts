import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Person } from 'src/app/data/models/entities/Person';
import { User } from 'src/app/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { SharedDataIService } from 'src/app/data/shared.data.iservice';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormService<User> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.usersCrud) public dataService: EntityCrudIService<User>,
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService
  ) {
    super();
  }

  public getPeople(): Observable<Person[]> {
    return this.sharedDataService.readAllPeople();
  }
}
