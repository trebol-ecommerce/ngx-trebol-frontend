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
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { ISharedDataApiService } from 'src/app/api/shared.data-api.iservice';
import { UserRole } from 'src/app/models/entities/UserRole';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUsers) public dataService: IEntityDataApiService<User>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataShared) protected sharedDataService: ISharedDataApiService
  ) {
    super();
  }

  getUserDetails(user: User): Observable<User> {
    return this.dataService.fetchExisting(user);
  }

  public getPeople(): Observable<Person[]> {
    return this.sharedDataService.readAllPeople();
  }

  public getUserRoles(): Observable<UserRole[]> {
    return this.sharedDataService.readAllUserRoles();
  }
}
