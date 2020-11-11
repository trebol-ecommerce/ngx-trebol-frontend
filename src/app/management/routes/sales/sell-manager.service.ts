// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Sell } from 'src/app/models/entities/Sell';
import { SellDetail } from 'src/app/models/entities/SellDetail';
import { CompositeEntityCrudIService } from 'src/app/api/data-mgt/composite-entity.crud.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class SellManagerService
  extends DataManagerService<Sell> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.salesCrud) protected dataService: CompositeEntityCrudIService<Sell, SellDetail>
  ) {
    super();
  }
}
