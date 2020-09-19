import { Inject, Injectable } from '@angular/core';
import { DataManagerFormService } from '../../data-manager-form.aservice';
import { Provider } from 'src/app/data/models/entities/Provider';
import { DATA_INJECTION_TOKENS } from 'src/app/data/data-injection-tokens';
import { EntityCrudIService } from 'src/app/data/entity.crud.iservice';

@Injectable()
export class ProviderManagerFormService
  extends DataManagerFormService<Provider> {

  constructor(
    @Inject(DATA_INJECTION_TOKENS.providers) protected dataService: EntityCrudIService<Provider>,
  ) {
    super();
  }
}
