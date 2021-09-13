// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { ICompositeEntityDataApiService } from 'src/app/api/composite-entity.data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { TransactionalDataManagerServiceDirective } from '../transactional-data-manager.service-directive';

@Injectable()
export class SellManagerService
  extends TransactionalDataManagerServiceDirective<Sell> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataSales) protected dataService: ICompositeEntityDataApiService<Sell, SellDetail>
  ) {
    super();
  }
}
