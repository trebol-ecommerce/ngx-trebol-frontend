/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class SalespersonManagerService
  extends TransactionalDataManagerServiceDirective<Salesperson> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSalespeople) public dataService: ITransactionalEntityDataApiService<Salesperson>
  ) {
    super();
  }
}
