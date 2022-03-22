/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ITransactionalEntityDataApiService } from "src/app/api/transactional-entity.data-api.iservice";
import { EntityTypeName } from "src/models/EntityTypeNames";

export interface EntityFormDialogData<T> {
  item?: T;
  apiService: ITransactionalEntityDataApiService<T>;
  dialogTitle?: string;
  entityType: EntityTypeName;
  successMessage?: (item: T) => string;
}
