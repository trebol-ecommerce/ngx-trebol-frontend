/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Shipper } from 'src/app/models/entities/Shipper';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class ShipperManagerService
  extends TransactionalDataManagerServiceDirective<Shipper> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataShippers) public dataService: ITransactionalEntityDataApiService<Shipper>
  ) {
    super();
  }
}
