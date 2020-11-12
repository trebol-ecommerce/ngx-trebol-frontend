// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { Person } from 'src/app/models/entities/Person';
import { User } from 'src/app/models/entities/User';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data-mgt/entity-data-api.iservice';
import { SharedDataApiIService } from 'src/app/api/data-mgt/shared-data-api.iservice';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.usersCrud) public dataService: EntityDataApiIService<User>,
    @Inject(API_SERVICE_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataApiIService
  ) {
    super();
  }

  public getPeople(): Observable<Person[]> {
    return this.sharedDataService.readAllPeople();
  }
}
