// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { User } from 'src/app/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/app/api/data-mgt/data-injection-tokens';
import { EntityCrudIService } from 'src/app/api/data-mgt/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class UserManagerService
  extends DataManagerService<User> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.usersCrud) protected dataService: EntityCrudIService<User>
  ) {
    super();
  }
}
