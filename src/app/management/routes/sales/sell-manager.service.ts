// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { CompositeEntityDataApiIService } from 'src/app/api/data-mgt/composite-entity-data-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class SellManagerService
  extends DataManagerService<Sell> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.salesCrud) protected dataService: CompositeEntityDataApiIService<Sell, SellDetail>
  ) {
    super();
  }
}
