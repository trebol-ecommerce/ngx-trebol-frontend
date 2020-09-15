import { Inject, Injectable } from '@angular/core';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Provider } from 'src/data/models/entities/Provider';
import { DATA_INJECTION_TOKENS } from 'src/data/data-injection-tokens';
import { EntityDataIService } from 'src/data/services/entity.data.iservice';

@Injectable()
export class ProviderManagerFormService
  extends DataManagerFormService<Provider> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.providers) protected dataService: EntityDataIService<Provider>,
  ) {
    super();
  }
}
