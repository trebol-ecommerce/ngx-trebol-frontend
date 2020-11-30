// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Product } from 'src/app/models/entities/Product';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data/entity-data-api.iservice';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class ProductManagerService
  extends DataManagerServiceDirective<Product> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.productsCrud) protected dataService: EntityDataApiIService<Product>
  ) {
    super();
  }
}
