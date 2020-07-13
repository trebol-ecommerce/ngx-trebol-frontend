import { Inject, Injectable } from '@angular/core';
import { Client } from 'src/data/models/entities/Client';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerAbstractService } from '../../data-manager.abstract-service';

@Injectable()
export class ClientManagerService
  extends DataManagerAbstractService<Client> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.clients) protected dataService: EntityDataIService<Client>
  ) {
    super();
  }
}
