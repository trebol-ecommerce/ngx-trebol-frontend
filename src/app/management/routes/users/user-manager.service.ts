// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { User } from 'src/app/models/entities/User';
import { TransactionalDataManagerServiceDirective } from '../transactional-data-manager.service-directive';

@Injectable()
export class UserManagerService
  extends TransactionalDataManagerServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUsers) protected dataService: ITransactionalEntityDataApiService<User>
  ) {
    super();
  }
}
