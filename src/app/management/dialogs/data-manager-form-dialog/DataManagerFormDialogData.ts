/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Type } from '@angular/core';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';

export interface DataManagerFormDialogData<T> {
  item: T;
  service: ITransactionalEntityDataApiService<T>;
  formComponent: Type<any>;
  title?: string;
  successMessage?: (item: T) => string;
}
