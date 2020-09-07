import { Inject, Injectable } from '@angular/core';
import { Provider } from 'src/data/models/entities/Provider';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';
import { DataManagerService } from '../../data-manager.aservice';

@Injectable()
export class ProviderManagerService
  extends DataManagerService<Provider> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.providers) protected dataService: EntityDataIService<Provider>
  ) {
    super();
  }
}
