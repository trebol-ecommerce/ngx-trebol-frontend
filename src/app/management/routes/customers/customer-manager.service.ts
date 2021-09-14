// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Customer } from 'src/app/models/entities/Customer';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataManagerServiceDirective } from '../../directives/data-manager.service-directive';

@Injectable()
export class CustomerManagerService
  extends DataManagerServiceDirective<Customer> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataCustomers) protected dataService: IEntityDataApiService<Customer>
  ) {
    super();
  }
}
