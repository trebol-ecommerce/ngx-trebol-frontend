// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Client } from 'src/app/models/entities/Client';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { EntityCrudIService } from 'src/app/api/data-mgt/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ClientManagerService
  extends DataManagerService<Client> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.clientsCrud) protected dataService: EntityCrudIService<Client>
  ) {
    super();
  }
}
