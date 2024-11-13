/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Inject, Injectable } from '@angular/core';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { DataManagerServiceDirective } from '../../directives/data-manager/data-manager.service.directive';
import { Person } from 'src/models/entities/Person';

@Injectable()
export class ManagementCustomersService
  extends DataManagerServiceDirective<Person> {

  constructor(
    @Inject(API_INJECTION_TOKENS.dataCustomers) protected dataService: IEntityDataApiService<Person>
  ) {
    super();
  }
}
