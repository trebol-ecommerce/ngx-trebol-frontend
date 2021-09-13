// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { Salesperson } from 'src/app/models/entities/Salesperson';
import { DataManagerFormServiceDirective } from '../../data-manager-form.service-directive';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

@Injectable()
export class SalespersonManagerFormService
  extends DataManagerFormServiceDirective<Salesperson> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSalespeople) protected dataService: ITransactionalEntityDataApiService<Salesperson>,
  ) {
    super();
  }

}
