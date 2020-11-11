// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Person } from 'src/app/models/entities/Person';
import { User } from 'src/app/models/entities/User';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { EntityCrudIService } from 'src/app/api/data-mgt/entity.crud.iservice';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormService<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.usersCrud) public dataService: EntityCrudIService<User>,
    @Inject(API_SERVICE_INJECTION_TOKENS.people) protected peopleDataService: Partial<EntityCrudIService<Person>>
  ) {
    super();
  }

  public getPeople(): Observable<Person[]> {
    return this.peopleDataService.readAll();
  }
}
