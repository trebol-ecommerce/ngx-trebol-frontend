import { Inject, Injectable } from '@angular/core';
import { Client } from 'src/app/data/models/entities/Client';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityDataIService } from 'src/app/data/entity.data.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ClientManagerService
  extends DataManagerService<Client> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.clients) protected dataService: EntityDataIService<Client>
  ) {
    super();
  }
}
