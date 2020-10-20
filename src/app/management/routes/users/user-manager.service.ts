// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { User } from 'src/app/data/models/entities/User';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
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
