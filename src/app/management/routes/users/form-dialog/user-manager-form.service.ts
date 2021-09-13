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
import { IUserRolesDataApiService } from 'src/app/api/user-roles.data-api.iservice';
import { UserRole } from 'src/app/models/entities/UserRole';
import { IPeopleDataApiService } from 'src/app/api/people.data-api.iservice';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUsers) public dataService: ITransactionalEntityDataApiService<User>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataPeople) protected peopleDataApiService: IPeopleDataApiService,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUserRoles) protected userRolesDataApiService: IUserRolesDataApiService
  ) {
    super();
  }

  getUserDetails(user: User): Observable<User> {
    return this.dataService.fetchExisting(user);
  }

  public getPeople(): Observable<Person[]> {
    return this.peopleDataApiService.readAllPeople();
  }

  public getUserRoles(): Observable<UserRole[]> {
    return this.userRolesDataApiService.readAllUserRoles();
  }
}
