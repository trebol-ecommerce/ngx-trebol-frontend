/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Product } from 'src/models/entities/Product';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';

@Injectable()
export class ManagementProductsService
  extends TransactionalDataManagerServiceDirective<Product> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) public dataService: ITransactionalEntityDataApiService<Product>
  ) {
    super();
  }
}
