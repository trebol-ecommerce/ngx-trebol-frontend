// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data-mgt/entity-data-api.iservice';
import { Seller } from 'src/app/models/entities/Seller';
import { DataManagerFormService } from '../../data-manager-form.aservice';

@Injectable()
export class SellerManagerFormService
  extends DataManagerFormService<Seller> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.sellersCrud) protected dataService: EntityDataApiIService<Seller>,
  ) {
    super();
  }

}
