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
import { UserRole } from 'src/app/models/entities/UserRole';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { map } from 'rxjs/operators';

@Injectable()
export class UserManagerFormService
  extends DataManagerFormServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUsers) public dataService: ITransactionalEntityDataApiService<User>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataPeople) protected peopleDataApiService: IEntityDataApiService<Person>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUserRoles) protected userRolesDataApiService: IEntityDataApiService<UserRole>
  ) {
    super();
  }

  getUserDetails(user: User): Observable<User> {
    return this.dataService.fetchExisting(user);
  }

  public getPeople(): Observable<Person[]> {
    return this.peopleDataApiService.fetchPage().pipe(map(page => page.items));
  }

  public getUserRoles(): Observable<UserRole[]> {
    return this.userRolesDataApiService.fetchPage().pipe(map(page => page.items));
  }
}
