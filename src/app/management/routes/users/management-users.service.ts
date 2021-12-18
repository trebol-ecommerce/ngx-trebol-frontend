/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { User } from 'src/models/entities/User';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class ManagementUsersService
  extends TransactionalDataManagerServiceDirective<User> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUsers) public dataService: ITransactionalEntityDataApiService<User>
  ) {
    super();
  }
}
