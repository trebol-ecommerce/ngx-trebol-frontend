// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Inject, Injectable } from '@angular/core';
import { Client } from 'src/app/models/entities/Client';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { EntityDataApiIService } from 'src/app/api/data/entity-data-api.iservice';
import { DataManagerServiceDirective } from '../data-manager.service-directive';

@Injectable()
export class ClientManagerService
  extends DataManagerServiceDirective<Client> {

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.clientsCrud) protected dataService: EntityDataApiIService<Client>
  ) {
    super();
  }
}
