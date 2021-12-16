/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Customer } from 'src/app/models/entities/Customer';
import { DataManagerServiceDirective } from '../../directives/data-manager.service-directive';

@Injectable()
export class ManagementCustomersService
  extends DataManagerServiceDirective<Customer> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataCustomers) protected dataService: IEntityDataApiService<Customer>
  ) {
    super();
  }
}
