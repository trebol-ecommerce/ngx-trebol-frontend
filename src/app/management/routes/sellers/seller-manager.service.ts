// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Seller } from 'src/app/models/entities/Seller';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data-mgt/entity-data-api.iservice';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class SellerManagerService
  extends DataManagerServiceDirective<Seller> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.sellersCrud) protected dataService: EntityDataApiIService<Seller>
  ) {
    super();
  }
}
