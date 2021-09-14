import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Type } from '@angular/core';

export interface DataManagerFormDialogData<T> {
  item: T;
  service: ITransactionalEntityDataApiService<T>;
  formComponent: Type<any>;
  title?: string;
  successMessage?: (item: T) => string;
}
