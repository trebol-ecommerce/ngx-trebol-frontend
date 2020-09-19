import { Inject, Injectable } from '@angular/core';
import { Provider } from 'src/app/data/models/entities/Provider';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';
import { DataManagerService } from '../data-manager.aservice';

@Injectable()
export class ProviderManagerService
  extends DataManagerService<Provider> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.providers) protected dataService: EntityCrudIService<Provider>
  ) {
    super();
  }
}
