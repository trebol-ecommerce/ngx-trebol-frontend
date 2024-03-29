/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Customer } from 'src/models/entities/Customer';
import { DataManagerServiceDirective } from '../../directives/data-manager/data-manager.service.directive';

@Injectable()
export class ManagementCustomersService
  extends DataManagerServiceDirective<Customer> {

  constructor(
    @Inject(API_INJECTION_TOKENS.dataCustomers) protected dataService: IEntityDataApiService<Customer>
  ) {
    super();
  }
}
