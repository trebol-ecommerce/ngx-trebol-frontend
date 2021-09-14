// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Product } from 'src/app/models/entities/Product';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { TransactionalDataManagerServiceDirective } from '../../directives/transactional-data-manager.service-directive';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

@Injectable()
export class ProductManagerService
  extends TransactionalDataManagerServiceDirective<Product> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataProducts) public dataService: ITransactionalEntityDataApiService<Product>
  ) {
    super();
  }
}
