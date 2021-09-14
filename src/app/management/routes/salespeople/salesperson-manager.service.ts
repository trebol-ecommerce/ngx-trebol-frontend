// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

@Injectable()
export class SalespersonManagerService
  extends TransactionalDataManagerServiceDirective<Salesperson> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSalespeople) public dataService: ITransactionalEntityDataApiService<Salesperson>
  ) {
    super();
  }
}
