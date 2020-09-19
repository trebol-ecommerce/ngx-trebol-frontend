import { Inject, Injectable } from '@angular/core';
import { Client } from 'src/app/data/models/entities/Client';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ClientManagerService
  extends DataManagerService<Client> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.clients) protected dataService: EntityCrudIService<Client>
  ) {
    super();
  }
}
